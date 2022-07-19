import mongoengine as me
from schema import Preprocessed_Products
from schema import Ranked_Products
import json

def get_associated_products(id):
    product = Preprocessed_Products.objects.get(_id=id)
    association = product.associated_products
    associated_products = []

    for i in range(len(association)):
        counter = i
        name = association[i] 
        info = Ranked_Products.objects.filter(name=name)
        info = info[0]
        info = json.loads(info.to_json())
        
        a = {
            "id": info['_id']['$oid'],
            "name": name,
            "price": info["price"],
            "image_url": info["image_url"],
            "sentiment": 3.66+(1.36*info["sentiment"]),
            "category": info["category"],
        }

        associated_products.append(a)

        if counter == 2:
            break
    
    return associated_products
