from mlxtend.frequent_patterns import apriori, association_rules
from datetime import date
import pandas as pd
import json
import string
import mongoengine as me
import numpy as np
from datetime import datetime
from schema import Users
from schema import Preprocessed_Products

def encode_u(x):
    if x < 1:
        return 0
    else:
        return 1

def get_associated_products(frozen_list):
    associated_products = []

    for i in range(len(frozen_list)):
        if len(frozen_list[i]) == 1:
            value1, = frozen_list[i]
            associated_products.append(value1)

        if len(frozen_list[i]) == 2:
            (value1,value2) = frozen_list[i]
            associated_products.append(value1)
            associated_products.append(value2)

        if len(frozen_list[i]) == 3:
            (value1,value2,value3) = frozen_list[i]
            associated_products.append(value1)
            associated_products.append(value2)
            associated_products.append(value3)

        if len(frozen_list[i]) == 4:
            (value1,value2,value3,value4) = frozen_list[i]
            associated_products.append(value1)
            associated_products.append(value2)
            associated_products.append(value3)
            associated_products.append(value4)

        if len(frozen_list[i]) == 5:
            (value1,value2,value3,value4,value5) = frozen_list[i]
            associated_products.append(value1)
            associated_products.append(value2)
            associated_products.append(value3)
            associated_products.append(value4)
            associated_products.append(value5)

    x = np.array(associated_products)
    x_unique = np.unique(x)
    return list(x_unique)

def association_rule_mining():
    # load existing data
    basket = pd.read_csv('basket.csv')
    basket = basket.applymap(encode_u)
    basket['Id'] = ''

    for i in range(len(basket)):
        basket['Id'][i] = f'{i}'

    # load new data
    users = Users.objects[1:]
    users = json.loads(users.to_json())
    
    for i in range(len(users)):
        id = users[i]['_id']['$oid']

        if id not in basket['Id'].values:
            basket = basket.append(pd.Series(0, index=basket.columns), ignore_index=True)
            last_index = len(basket)-1
            basket['Id'][last_index] = id

            for j in range(len(users[i]['viewed'])):
                product = users[i]['viewed'][j]['name']
                basket[product][last_index] = 1

        else:
            for j in range(len(basket)):
                if basket["Id"][j] == id:
                    for k in range(len(users[i]['viewed'])):
                        product = users[i]['viewed'][k]['name']
                        basket[product][j] = 1
                             
    # generate new rules
    bas = basket.loc[:, basket.columns!='Id']
    frequent_itemsets = apriori(bas, min_support=0.05, use_colnames=True)
    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1)
    new_rules = rules.sort_values(['lift','support'],ascending=False).reset_index(drop=True)
    
    ## Update Database
    # 1. empty associated_products 
    for i in range(Preprocessed_Products.objects.count()):

        product = Preprocessed_Products.objects[i] 
        count = len(product.associated_products)

        for j in range(count):
            product.associated_products.pop() 
            product.save()
            
    # 2. insert new associated_products
    for i in range(Preprocessed_Products.objects.count()):
        product = Preprocessed_Products.objects[i] 
        name = product.name

        frozen_list = []
        for i in range(len(rules)):
            if rules["antecedents"][i] == frozenset({name}):
                frozen_list.append(rules["consequents"][i])

        associated_products = get_associated_products(frozen_list)

        for j in range(len(associated_products)):
            product.associated_products.append(associated_products[j]) 
            product.save()
            
    # output to csv files
    bas.to_csv(f"basket.csv") 
    
    # output to csv files for recording purpose    
    today = date.today()
    bas.to_csv(f"Basket/basket_{today}.csv")
    new_rules.to_csv(f"Rules/rules_{today}.csv")