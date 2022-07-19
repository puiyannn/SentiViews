import json
from schema import Ranked_Products
from schema import Preprocessed_Products
from bson.objectid import ObjectId

def get_comparison(id_list):

    comparison_info = []

    for i in range(len(id_list)):
        id = id_list[i]
        product = Ranked_Products.objects.get(_id=id)
        p = Preprocessed_Products.objects.get(_id=id)

        description = p.description
        url = p.url
        p = json.loads(p.to_json())
        reviews = p['reviews']

        f1_positive = 0
        f1_negative = 0
        f2_positive = 0
        f2_negative = 0
        f3_positive = 0
        f3_negative = 0
        f4_positive = 0
        f4_negative = 0
        f5_positive = 0
        f5_negative = 0

        f1_score = 0
        f2_score = 0
        f3_score = 0
        f4_score = 0
        f5_score = 0


        score = 3.66+ (1.36*product.sentiment) 

        if product.f1_sentiment != 0:
            f1_score = 3.66+ (1.36*product.f1_sentiment) 
            for i in range(len(reviews)):
                if reviews[i]['f1_sentiment'] > 0:
                    f1_positive += 1

                if reviews[i]['f1_sentiment'] < 0:
                    f1_negative += 1

        if product.f2_sentiment != 0:
            f2_score = 3.66+ (1.36*product.f2_sentiment) 
            for i in range(len(reviews)):
                if reviews[i]['f2_sentiment'] > 0:
                    f2_positive += 1

                if reviews[i]['f2_sentiment'] < 0:
                    f2_negative += 1


        if product.f3_sentiment != 0:
            f3_score = 3.66+ (1.36*product.f3_sentiment) 
            for i in range(len(reviews)):
                if reviews[i]['f3_sentiment'] > 0:
                    f3_positive += 1

                if reviews[i]['f3_sentiment'] < 0:
                    f3_negative += 1


        try:
            if product.f4_sentiment != 0:
                f4_score = 3.66+ (1.36*product.f4_sentiment) 
                for i in range(len(reviews)):
                    if reviews[i]['f4_sentiment'] > 0:
                        f4_positive += 1

                    if reviews[i]['f4_sentiment'] < 0:
                        f4_negative += 1
        except TypeError:
            f4_score = 0

        try:
            if product.f5_sentiment != 0:
                f5_score = 3.66+ (1.36*product.f5_sentiment) 
                for i in range(len(reviews)):
                    if reviews[i]['f5_sentiment'] > 0:
                        f5_positive += 1

                    if reviews[i]['f5_sentiment'] < 0:
                        f5_negative += 1
        except TypeError:
            f5_score = 0
        

        info = {
            'id': id,
            'name': product.name,
            'price': product.price,
            'url': url,
            'image_url': product.image_url,
            'description': description,
            'f1_sentiment': f1_score,
            'f2_sentiment': f2_score,
            'f3_sentiment': f3_score,
            'f4_sentiment': f4_score,
            'f5_sentiment': f5_score,
            'f1_count': product.f1_count,
            'f2_count': product.f2_count,
            'f3_count': product.f3_count,
            'f4_count': product.f4_count,
            'f5_count': product.f5_count,
            'sentiment': score,
            'f1_positive': f1_positive,
            'f1_negative': f1_negative,
            'f2_positive': f2_positive,
            'f2_negative': f2_negative,
            'f3_positive': f3_positive,
            'f3_negative': f3_negative,
            'f4_positive': f4_positive,
            'f4_negative': f4_negative,
            'f5_positive': f5_positive,
            'f5_negative': f5_negative,
        }

        comparison_info.append(info)

    if len(comparison_info) > 6:
        comparison_info = comparison_info[:6]

    return comparison_info
