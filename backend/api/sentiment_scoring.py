import json
import mongoengine as me
from schema import Ranked_Products
from operator import itemgetter
from operator import itemgetter

def get_sentiment(f1, f2, f3, f4, f5, category):
    denom = 0
    products = []

    if f1 == True:
        denom += 1
    
    if f2 == True:
        denom += 1

    if f3 == True:
        denom += 1
    
    if f4 == True:
        denom += 1

    if f5 == True:
        denom += 1

    # append products with more than 10 reviews mentioning the selected features
    for i in range((Ranked_Products.objects(category=category).count())):
        product = json.loads(Ranked_Products.objects(category=category)[i].to_json())
        count = 0

        if f1 == True:
            count += product['f1_count']

        if f2 == True:
            count += product['f2_count']

        if f3 == True:
            count += product['f3_count']

        if f4 == True:
            count += product['f4_count']

        if f5 == True:
            count += product['f5_count']

        if count >= 5:
            products.append(product)

    for i in range(len(products)):
        total_sentiment = 0

        if f1 == True:
            total_sentiment += products[i]['f1_sentiment']
        
        if f2 == True:
            total_sentiment += products[i]['f2_sentiment']

        if f3 == True:
            total_sentiment += products[i]['f3_sentiment']

        if f4 == True:
            total_sentiment += products[i]['f4_sentiment']

        if f5 == True:
            total_sentiment += products[i]['f5_sentiment']

        products[i]['sentiment'] = total_sentiment/denom

    sorted_products = sorted(products, key=itemgetter('sentiment'), reverse=True)

    return sorted_products

        
        
        

