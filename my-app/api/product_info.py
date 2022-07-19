import mongoengine as me
import math
import json
from bson.objectid import ObjectId
from scipy import spatial
from operator import itemgetter
from schema import Preprocessed_Products

def scoring(f1,f2,f3,f4,f5,product):
    
    sentiment = 0

    if f1 == True:
        sentiment += product['f1_sentiment']

    if f2 == True:
        sentiment += product['f2_sentiment']

    if f3 == True:
        sentiment += product['f3_sentiment']

    if f4 == True:
        sentiment += product['f4_sentiment']
    
    if f5 == True:
        sentiment += product['f5_sentiment']

    return sentiment

def by_feature(reviews,f1,f2,f3,f4,f5):
    f1_positive = []
    f1_negative = []
    f1_count = 0
    f2_positive = []
    f2_negative = []
    f2_count = 0
    f3_positive = []
    f3_negative = []
    f3_count = 0
    f4_positive = []
    f4_negative = []
    f4_count = 0
    f5_positive = []
    f5_negative = []
    f5_count = 0
    mentioned = False
    mentioned_count = 0 

    for i in range(len(reviews)):

        if f1 == True:
            if reviews[i]['f1_sentiment'] > 0:
                f1_positive.append(reviews[i])
                f1_count += 1
                mentioned = True
            
            if reviews[i]['f1_sentiment'] < 0:
                f1_negative.append(reviews[i])
                f1_count += 1
                mentioned = True

        if f2 == True:
            if reviews[i]['f2_sentiment'] > 0:
                f2_positive.append(reviews[i])
                f2_count += 1
                mentioned = True
            
            if reviews[i]['f2_sentiment'] < 0:
                f2_negative.append(reviews[i])
                f2_count += 1
                mentioned = True

        if f3 == True:
            if reviews[i]['f3_sentiment'] > 0:
                f3_positive.append(reviews[i])
                f3_count += 1
                mentioned = True
            
            if reviews[i]['f3_sentiment'] < 0:
                f3_negative.append(reviews[i])
                f3_count += 1
                mentioned = True

        if f4 == True:
            if reviews[i]['f4_sentiment'] > 0:
                f4_positive.append(reviews[i])
                f4_count += 1
                mentioned = True
            
            if reviews[i]['f4_sentiment'] < 0:
                f4_negative.append(reviews[i])
                f4_count += 1
                mentioned = True
        
        if f5 == True:
            if reviews[i]['f5_sentiment'] > 0:
                f5_positive.append(reviews[i])
                f5_count += 1
                mentioned = True
            
            if reviews[i]['f5_sentiment'] < 0:
                f5_negative.append(reviews[i])
                f5_count += 1
                mentioned = True
        

        if mentioned == True:
            mentioned_count += 1


    return f1_positive, f1_negative, f1_count, f2_positive, f2_negative, f2_count, f3_positive, f3_negative, f3_count, f4_positive, f4_negative, f4_count, f5_positive, f5_negative, f5_count, mentioned_count

    

def get_info(f1,f2,f3,f4,f5,id):

    denom = 0

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

    # if denom == 0:
    #     denom = 4

    product = Preprocessed_Products.objects.get(_id=id)
    product = json.loads(product.to_json())
    total_sentiment = scoring(f1,f2,f3,f4,f5,product)

    reviews = product['reviews']
    # top = get_top(reviews)
    # top_positive_reviews = top[0]
    # top_negative_reviews = top[1]
    feats = by_feature(reviews,f1,f2,f3,f4,f5)
    f1_positive = feats[0]
    f1_negative = feats[1]
    f1_count = feats[2]
    f1_percentage = round((feats[2]/len(reviews)*100),2)
    f2_positive = feats[3]
    f2_negative = feats[4]    
    f2_count = feats[5]
    f2_percentage = round((feats[5]/len(reviews)*100),2)
    f3_positive = feats[6]
    f3_negative = feats[7]    
    f3_count = feats[8]
    f3_percentage = round((feats[8]/len(reviews)*100),2)
    f4_positive = feats[9]
    f4_negative = feats[10]  
    f4_count = feats[11]  
    f4_percentage = round((feats[11]/len(reviews)*100),2)
    f5_positive = feats[12]
    f5_negative = feats[13]    
    f5_count = feats[14]
    f5_percentage = round((feats[14]/len(reviews)*100),2)
    mentioned_count = feats[15]
    # print(len(reviews))
    # mentioned_percentage = mentioned_count/len(reviews)*100

    score = total_sentiment/denom
    score = 3.66+ (1.36*score) 
    f1_score = 3.66+ (1.36*product['f1_sentiment'] ) 
    f2_score = 3.66+ (1.36*product['f2_sentiment'] ) 
    f3_score = 3.66+ (1.36*product['f3_sentiment'] ) 

    try:
        f4_score = 3.66+ (1.36*product['f4_sentiment'] ) 
    except KeyError:
        print("No f4!")
        f4_score = 0

    try:
        f5_score = 3.66+ (1.36*product['f5_sentiment'] ) 
    except KeyError:
        print("No f5!")
        f5_score = 0



    result = {
        'name': product['name'],
        'price': product['price'],
        'url': product['url'],
        'image_url': product['image_url'],
        'description': product['description'], 
        'platform': product['platform'], 
        'category': product['category'], 
        'sentiment': score,
        'f1_sentiment': f1_score,
        'f2_sentiment': f2_score,
        'f3_sentiment': f3_score,
        'f4_sentiment': f4_score,
        'f5_sentiment': f5_score,
        'similarity': product['similarity'],
        'reviews': product['reviews'],
        'f1_positive': f1_positive,
        'f1_negative': f1_negative, 
        'f1_positive_count': len(f1_positive),
        'f1_negative_count': len(f1_negative), 
        'f1_percentage': f1_percentage,
        'f1_count': f1_count, 
        'f2_positive': f2_positive,
        'f2_negative': f2_negative,
        'f2_positive_count': len(f2_positive),
        'f2_negative_count': len(f2_negative),         
        'f2_percentage': f2_percentage,
        'f2_count': f2_count,  
        'f3_positive': f3_positive,
        'f3_negative': f3_negative, 
        'f3_positive_count': len(f3_positive),
        'f3_negative_count': len(f3_negative),        
        'f3_percentage': f3_percentage, 
        'f3_count': f3_count, 
        'f4_positive': f4_positive,
        'f4_negative': f4_negative,
        'f4_positive_count': len(f4_positive),
        'f4_negative_count': len(f4_negative),         
        'f4_percentage':f4_percentage,
        'f4_count': f4_count, 
        'f5_positive': f5_positive,
        'f5_negative': f5_negative,
        'f5_positive_count': len(f5_positive),
        'f5_negative_count': len(f5_negative),         
        'f5_percentage':f5_percentage,
        'f5_count': f5_count,         
    }


    results = []

    for i in range(1,6):
        res = {
            'id': f"f{i}",
            'name':"Long Lasting",
            'positive': f"f{i}_positive",
            'negative': f"f{i}_negative",
            'positive_count': len(f"f{i}_positive"),
            'negative_count': len(f"f{i}_negative"),
            'percentage': f"f{i}_percentage",
            'count': f"f{i}_count",
        }
        results.append(res)

    print(results)

    return result

