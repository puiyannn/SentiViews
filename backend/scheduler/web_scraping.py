from schema import Preprocessed_Products
from schema import Ranked_Products
from schema import Preprocessed_Review
import csv
from bs4 import BeautifulSoup
from selenium import webdriver
import json
from nltk.tokenize import word_tokenize
from bson.objectid import ObjectId
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime
import nltk
import numpy as np
import math
import re
import pickle
from operator import itemgetter
from scipy import spatial
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')

def get_sentiment(review,category):
        
    with open(f'Categories/{category}/new_words.pickle', 'rb') as handle:
        new_words = pickle.load(handle)
    sid = SentimentIntensityAnalyzer()
    sid.lexicon.update(new_words) 
    score = sid.polarity_scores(review) 
    compound = score.get('compound') 
    
    return compound

def transform(review,category):
    
    review = re.sub(r"’", "'", review)
    
    with open(f'Categories/{category}/bigrams.pickle', 'rb') as handle:
        bigrams = pickle.load(handle)

    lookup = set(bigrams)
    
    # tokenization
    review = review.lower()
    tokens = nltk.word_tokenize(review)
    
    # transform phrases
    answer = []
    q_iter = iter(range(len(tokens)))
    
    for idx in q_iter:
        answer.append(tokens[idx])
        if idx < (len(tokens) - 1) and (tokens[idx], tokens[idx+1]) in lookup:
            answer[-1] = answer[-1] + '_' + tokens[idx+1]
            next(q_iter)

    # revert back to string format
    transformed_review = ''
    for i in range(len(answer)):
        transformed_review = transformed_review + answer[i] + ' '
        
    return transformed_review  

def window(review, f):
    tokens = nltk.word_tokenize(review)
    
    window = ''
    for i in range(len(tokens)):
        if tokens[i] in f:

            if i<3:
                for x in range(i-i,i+4):
                    try:
                        window = window + tokens[x] + ' '

                    except IndexError:
                        break

            else:
                for x in range(i-3, i+4):
                    try:
                        window = window + tokens[x] + ' '

                    except IndexError:
                        break

    return window

def transform_date(date):
    d = word_tokenize(date)
    
    date = ''
    for i in range(len(d)):
        if d[i] == 'on':
            date += d[i+1]
            date += ' '
            date += d[i+2]
            date += ' '
            date += d[i+4]
            
    datetime_object = datetime.strptime(date, '%B %d %Y')
    date = datetime_object.date()
    
    return date

def amazon(category):
    # initializing variables
    print("Inside Amazon...")
    open_file = open(f"Categories/{category}/f1.pkl", "rb")
    f1 = pickle.load(open_file)
    open_file.close()

    open_file = open(f"Categories/{category}/f2.pkl", "rb")
    f2 = pickle.load(open_file)
    open_file.close()

    open_file = open(f"Categories/{category}/f3.pkl", "rb")
    f3 = pickle.load(open_file)
    open_file.close()

    if category!="Scrub" and category!="Primer":
        open_file = open(f"Categories/{category}/f4.pkl", "rb")
        f4 = pickle.load(open_file)
        open_file.close()

    if category!="Lipstick" and category!="Scrub" and category!="Primer":
        open_file = open(f"Categories/{category}/f5.pkl", "rb")
        f5 = pickle.load(open_file)
        open_file.close()

    # scraping new reviews
    products = Preprocessed_Products.objects(platform="Amazon",category=category)
    products = json.loads(products.to_json())
    print("Scraping new reviews...")
    for i in range(len(products)):
        print(i)
        driver = webdriver.Chrome(executable_path = 'C:/chromedriver.exe')
        driver.get(products[i]['url'])
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        new_reviews = []

        try:
            all_reviews_url_parent = soup.find('div',{'id':'reviews-medley-footer'})
            recent_reviews_url = 'https://www.amazon.com'+ all_reviews_url_parent.a.get('href') + '&sortBy=recent'

            for x in range(1,4):
                url = recent_reviews_url + f"&pageNumber={x}"
                driver.get(url)
                soup = BeautifulSoup(driver.page_source, 'html.parser')
                results = soup.find_all('div',{'data-hook':'review'})

                for item in results:
                    date = item.find('span',{'data-hook':'review-date'}).text.strip()
                    date = transform_date(date)
                    ppp = Preprocessed_Products.objects.get(_id=products[i]['_id']['$oid'])
                    ddd = ppp["reviews"][0]["date"].date()

    #                 if date > products[i]['last_reviewed'].date():
                    if date > ddd:

                        u = item.find('span','a-profile-name').text.strip()
                        c = item.find('span',{'data-hook':'review-body'}).text.strip()
                        d = transform_date(item.find('span',{'data-hook':'review-date'}).text.strip())

                        new_review = {
                            "username": u,
                            "content": c,
                            "transformed_content": transform(c,category),
                            "date": d
                        }

                        new_reviews.append(new_review)

                if not soup.find('li',{'class':'a-disabled a-last'}):
                    pass

                else:
                    break

        except AttributeError:
            pass

        ### update preprocessed_products
        f1_count = 0
        f2_count = 0
        f3_count = 0
        f4_count = 0
        f5_count = 0
        f1_total = 0
        f2_total = 0
        f3_total = 0
        f4_total = 0
        f5_total = 0

        for j in range(len(new_reviews)):

            review = new_reviews[j]["transformed_content"]
            new_reviews[j]["f1_sentiment"] = 0
            new_reviews[j]["f2_sentiment"] = 0
            new_reviews[j]["f3_sentiment"] = 0
            
            if category!="Scrub" and category!="Primer": 
                new_reviews[j]["f4_sentiment"] = 0
                
            if category!="Lipstick" and category!="Scrub" and category!="Primer":    
                new_reviews[j]["f5_sentiment"] = 0

            if any(word in review for word in f1):
                new_reviews[j]["f1_sentiment"] = get_sentiment(window(review,f1),category)
                f1_count += 1
                f1_total += new_reviews[j]["f1_sentiment"]

            if any(word in review for word in f2):
                new_reviews[j]["f2_sentiment"] = get_sentiment(window(review,f2),category)
                f2_count += 1
                f2_total += new_reviews[j]["f2_sentiment"]

            if any(word in review for word in f3):
                new_reviews[j]["f3_sentiment"] = get_sentiment(window(review,f3),category)
                f3_count += 1
                f3_total += new_reviews[j]["f3_sentiment"]

            if category!="Scrub" and category!="Primer": 
                if any(word in review for word in f4):
                    new_reviews[j]["f4_sentiment"] = get_sentiment(window(review,f4),category)
                    f4_count += 1
                    f4_total += new_reviews[j]["f4_sentiment"]

            if category!="Lipstick" and category!="Scrub" and category!="Primer":
                if any(word in review for word in f5):
                    new_reviews[j]["f5_sentiment"] = get_sentiment(window(review,f5),category)
                    f5_count += 1
                    f5_total += new_reviews[j]["f5_sentiment"]

        ranked_product = Ranked_Products.objects.get(_id=products[i]['_id']['$oid'])  
        new_f1_count = ranked_product.f1_count + f1_count
        new_f2_count = ranked_product.f2_count + f2_count
        new_f3_count = ranked_product.f3_count + f3_count
        
        if category!="Scrub" and category!="Primer":
            new_f4_count = ranked_product.f4_count + f4_count
            
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            new_f5_count = ranked_product.f5_count + f5_count

        try: 
            f1_sentiment = ((ranked_product.f1_sentiment*ranked_product.f1_count)+f1_total)/(new_f1_count)
        except ZeroDivisionError:
            f1_sentiment = 0
        
        try: 
            f2_sentiment = ((ranked_product.f2_sentiment*ranked_product.f2_count)+f2_total)/(new_f2_count)
        except ZeroDivisionError:
            f2_sentiment = 0
            
        try: 
            f3_sentiment = ((ranked_product.f3_sentiment*ranked_product.f3_count)+f3_total)/(new_f3_count)
        except ZeroDivisionError:
            f3_sentiment = 0
            
        if category!="Scrub" and category!="Primer": 
            try: 
                f4_sentiment = ((ranked_product.f4_sentiment*ranked_product.f4_count)+f4_total)/(new_f4_count)
            except ZeroDivisionError:
                f4_sentiment = 0
                
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            try: 
                f5_sentiment = ((ranked_product.f5_sentiment*ranked_product.f5_count)+f5_total)/(new_f5_count)
            except ZeroDivisionError:
                f5_sentiment = 0
                
        if category=="Scrub" or category=="Primer":
            new_sentiment = (f1_sentiment + f2_sentiment + f3_sentiment)/3
        
        elif category=="Lipstick":
            new_sentiment = (f1_sentiment + f2_sentiment + f3_sentiment + f4_sentiment)/4
            
        else:
            new_sentiment = (f1_sentiment + f2_sentiment + f3_sentiment + f4_sentiment + f5_sentiment)/5

        ranked_product.f1_sentiment = f1_sentiment
        ranked_product.f2_sentiment = f2_sentiment
        ranked_product.f3_sentiment = f3_sentiment
        ranked_product.f1_count = new_f1_count
        ranked_product.f2_count = new_f2_count
        ranked_product.f3_count = new_f3_count
        
        if category!="Scrub" and category!="Primer": 
            ranked_product.f4_sentiment = f4_sentiment
            ranked_product.f4_count = new_f4_count
        
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            ranked_product.f5_sentiment = f5_sentiment
            ranked_product.f5_count = new_f5_count
        
        ranked_product.sentiment = new_sentiment
        ranked_product.save()


        #### update preprocessed product
        preprocessed_product = Preprocessed_Products.objects.get(_id=products[i]['_id']['$oid'])  
        preprocessed_product.f1_sentiment=f1_sentiment
        preprocessed_product.f2_sentiment=f2_sentiment
        preprocessed_product.f3_sentiment=f3_sentiment
        
        if category!="Scrub" and category!="Primer": 
            preprocessed_product.f4_sentiment=f4_sentiment
        
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            preprocessed_product.f5_sentiment=f5_sentiment 
            
        if len(new_reviews) > 0:
            preprocessed_product.last_reviewed=new_reviews[0]['date']
            preprocessed_product.save()

        for k in range(len(new_reviews)):
            u = new_reviews[k]["username"] 
            c = new_reviews[k]["content"]
            t = new_reviews[k]["transformed_content"]
            d = new_reviews[k]["date"]
            f1s = new_reviews[k]["f1_sentiment"]
            f2s = new_reviews[k]["f2_sentiment"]
            f3s = new_reviews[k]["f3_sentiment"]
            
            if category!="Scrub" and category!="Primer":
                f4s = new_reviews[k]["f4_sentiment"]
                
            if category!="Lipstick" and category!="Scrub" and category!="Primer":
                f5s = new_reviews[k]["f5_sentiment"]

            if category=="Scrub" or category=="Primer":
                review = Preprocessed_Review(username=u, date=d, content=c, transformed_content=t, 
                        f1_sentiment=f1s, f2_sentiment=f2s, f3_sentiment=f3s) 

            elif category=="Lipstick":
                review = Preprocessed_Review(username=u, date=d, content=c, transformed_content=t, 
                        f1_sentiment=f1s, f2_sentiment=f2s, f3_sentiment=f3s, f4_sentiment=f4s) 

            else:
                review = Preprocessed_Review(username=u, date=d, content=c, transformed_content=t, 
                        f1_sentiment=f1s, f2_sentiment=f2s, f3_sentiment=f3s, f4_sentiment=f4s, f5_sentiment=f5s) 

            preprocessed_product.reviews.append(review) 
            preprocessed_product.save()

def format_date(d):
    datetime_object = datetime.strptime(d, '%d %b %Y')
    date = datetime_object.date()
    return date

def sephora(category):
    print("In Sephora...")
    # initializing variables
    open_file = open(f"Categories/{category}/f1.pkl", "rb")
    f1 = pickle.load(open_file)
    open_file.close()

    open_file = open(f"Categories/{category}/f2.pkl", "rb")
    f2 = pickle.load(open_file)
    open_file.close()

    open_file = open(f"Categories/{category}/f3.pkl", "rb")
    f3 = pickle.load(open_file)
    open_file.close()

    if category!="Scrub" and category!="Primer":
        open_file = open(f"Categories/{category}/f4.pkl", "rb")
        f4 = pickle.load(open_file)
        open_file.close()

    if category!="Lipstick" and category!="Scrub" and category!="Primer":
        open_file = open(f"Categories/{category}/f5.pkl", "rb")
        f5 = pickle.load(open_file)
        open_file.close()

    # scraping new reviews
    products = Preprocessed_Products.objects(platform="Sephora",category=category)
    products = json.loads(products.to_json())
    print("Scraping new reviews...")
    for i in range(len(products)):
        print(i)
        new_reviews = []
        
        driver = webdriver.Chrome(executable_path = 'C:/chromedriver.exe')
        driver.maximize_window()     
        driver.get(products[i]['url'])
        soup = BeautifulSoup(driver.page_source, 'html.parser')
    #     WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "//div[@class='dy-lb-close']"))).click()
        time.sleep(20)
        review_exist = driver.find_elements_by_class_name('review-text')

        if len(review_exist) != 0:
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            review_list = soup.find('ul',{'class':'product-reviews-list'})
            for rev in review_list.find_all("li"):
                username = rev.find('div',{'class':'author'}).text
                content = rev.find('p',{'class':'review-text'}).text
                date = format_date(rev.find('p',{'class':'date'}).text)
                ppp = Preprocessed_Products.objects.get(_id=products[i]['_id']['$oid'])
                ddd = ppp["reviews"][0]["date"].date()

                if date > ddd:

                    new_review = {
                        "username": username,
                        "content": content,
                        "transformed_content": transform(content,category),
                        "date": date
                    }

                    new_reviews.append(new_review)

        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//div[@class='dy-full-width-notifications-close']"))).click()
        next_button = soup.find('a',{'class':'page next'})
        counter = 1
        while next_button is not None and counter<=5:
            counter += 1
            driver.find_element_by_xpath("//a[@class='page next']").click()
            time.sleep(5)
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            review_list = soup.find('ul',{'class':'product-reviews-list'})
            for rev in review_list.find_all("li"):
                username = rev.find('div',{'class':'author'}).text
                content = rev.find('p',{'class':'review-text'}).text
                date = format_date(rev.find('p',{'class':'date'}).text)
                ppp = Preprocessed_Products.objects.get(_id=products[i]['_id']['$oid'])
                ddd = ppp["reviews"][0]["date"].date()

                if date > ddd:

                    new_review = {
                        "username": username,
                        "content": content,
                        "transformed_content": transform(content,category),
                        "date": date
                    }

                    new_reviews.append(new_review)
            next_button = soup.find('a',{'class':'page next'})

        ### update preprocessed_products
        f1_count = 0
        f2_count = 0
        f3_count = 0
        f4_count = 0
        f5_count = 0
        f1_total = 0
        f2_total = 0
        f3_total = 0
        f4_total = 0
        f5_total = 0

        for j in range(len(new_reviews)):

            review = new_reviews[j]["transformed_content"]
            new_reviews[j]["f1_sentiment"] = 0
            new_reviews[j]["f2_sentiment"] = 0
            new_reviews[j]["f3_sentiment"] = 0
            
            if category!="Scrub" and category!="Primer": 
                new_reviews[j]["f4_sentiment"] = 0
                
            if category!="Lipstick" and category!="Scrub" and category!="Primer":    
                new_reviews[j]["f5_sentiment"] = 0

            if any(word in review for word in f1):
                new_reviews[j]["f1_sentiment"] = get_sentiment(window(review,f1),category)
                f1_count += 1
                f1_total += new_reviews[j]["f1_sentiment"]

            if any(word in review for word in f2):
                new_reviews[j]["f2_sentiment"] = get_sentiment(window(review,f2),category)
                f2_count += 1
                f2_total += new_reviews[j]["f2_sentiment"]

            if any(word in review for word in f3):
                new_reviews[j]["f3_sentiment"] = get_sentiment(window(review,f3),category)
                f3_count += 1
                f3_total += new_reviews[j]["f3_sentiment"]

            if category!="Scrub" and category!="Primer": 
                if any(word in review for word in f4):
                    new_reviews[j]["f4_sentiment"] = get_sentiment(window(review,f4),category)
                    f4_count += 1
                    f4_total += new_reviews[j]["f4_sentiment"]

            if category!="Lipstick" and category!="Scrub" and category!="Primer":
                if any(word in review for word in f5):
                    new_reviews[j]["f5_sentiment"] = get_sentiment(window(review,f5),category)
                    f5_count += 1
                    f5_total += new_reviews[j]["f5_sentiment"]

        ranked_product = Ranked_Products.objects.get(_id=products[i]['_id']['$oid'])  
        new_f1_count = ranked_product.f1_count + f1_count
        new_f2_count = ranked_product.f2_count + f2_count
        new_f3_count = ranked_product.f3_count + f3_count
        
        if category!="Scrub" and category!="Primer":
            new_f4_count = ranked_product.f4_count + f4_count
            
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            new_f5_count = ranked_product.f5_count + f5_count

        try: 
            f1_sentiment = ((ranked_product.f1_sentiment*ranked_product.f1_count)+f1_total)/(new_f1_count)
        except ZeroDivisionError:
            f1_sentiment = 0
        
        try: 
            f2_sentiment = ((ranked_product.f2_sentiment*ranked_product.f2_count)+f2_total)/(new_f2_count)
        except ZeroDivisionError:
            f2_sentiment = 0
            
        try: 
            f3_sentiment = ((ranked_product.f3_sentiment*ranked_product.f3_count)+f3_total)/(new_f3_count)
        except ZeroDivisionError:
            f3_sentiment = 0
            
        if category!="Scrub" and category!="Primer": 
            try: 
                f4_sentiment = ((ranked_product.f4_sentiment*ranked_product.f4_count)+f4_total)/(new_f4_count)
            except ZeroDivisionError:
                f4_sentiment = 0
                
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            try: 
                f5_sentiment = ((ranked_product.f5_sentiment*ranked_product.f5_count)+f5_total)/(new_f5_count)
            except ZeroDivisionError:
                f5_sentiment = 0
                
        if category=="Scrub" or category=="Primer":
            new_sentiment = (f1_sentiment + f2_sentiment + f3_sentiment)/3
        
        elif category=="Lipstick":
            new_sentiment = (f1_sentiment + f2_sentiment + f3_sentiment + f4_sentiment)/4
            
        else:
            new_sentiment = (f1_sentiment + f2_sentiment + f3_sentiment + f4_sentiment + f5_sentiment)/5

        ranked_product.f1_sentiment = f1_sentiment
        ranked_product.f2_sentiment = f2_sentiment
        ranked_product.f3_sentiment = f3_sentiment
        ranked_product.f1_count = new_f1_count
        ranked_product.f2_count = new_f2_count
        ranked_product.f3_count = new_f3_count
        
        if category!="Scrub" and category!="Primer": 
            ranked_product.f4_sentiment = f4_sentiment
            ranked_product.f4_count = new_f4_count
        
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            ranked_product.f5_sentiment = f5_sentiment
            ranked_product.f5_count = new_f5_count
        
        ranked_product.sentiment = new_sentiment
        ranked_product.save()


        #### update preprocessed product
        preprocessed_product = Preprocessed_Products.objects.get(_id=products[i]['_id']['$oid'])  
        preprocessed_product.f1_sentiment=f1_sentiment
        preprocessed_product.f2_sentiment=f2_sentiment
        preprocessed_product.f3_sentiment=f3_sentiment
        
        if category!="Scrub" and category!="Primer": 
            preprocessed_product.f4_sentiment=f4_sentiment
        
        if category!="Lipstick" and category!="Scrub" and category!="Primer":
            preprocessed_product.f5_sentiment=f5_sentiment 

        if len(new_reviews) > 0:
            preprocessed_product.last_reviewed=new_reviews[0]['date']
            preprocessed_product.save() 

        for k in range(len(new_reviews)):
            u = new_reviews[k]["username"] 
            c = new_reviews[k]["content"]
            t = new_reviews[k]["transformed_content"]
            d = new_reviews[k]["date"]
            f1s = new_reviews[k]["f1_sentiment"]
            f2s = new_reviews[k]["f2_sentiment"]
            f3s = new_reviews[k]["f3_sentiment"]
            
            if category!="Scrub" and category!="Primer":
                f4s = new_reviews[k]["f4_sentiment"]
                
            if category!="Lipstick" and category!="Scrub" and category!="Primer":
                f5s = new_reviews[k]["f5_sentiment"]

            if category=="Scrub" or category=="Primer":
                review = Preprocessed_Review(username=u, date=d, content=c, transformed_content=t, 
                        f1_sentiment=f1s, f2_sentiment=f2s, f3_sentiment=f3s) 

            elif category=="Lipstick":
                review = Preprocessed_Review(username=u, date=d, content=c, transformed_content=t, 
                        f1_sentiment=f1s, f2_sentiment=f2s, f3_sentiment=f3s, f4_sentiment=f4s) 

            else:
                review = Preprocessed_Review(username=u, date=d, content=c, transformed_content=t, 
                        f1_sentiment=f1s, f2_sentiment=f2s, f3_sentiment=f3s, f4_sentiment=f4s, f5_sentiment=f5s) 

                
            preprocessed_product.reviews.append(review) 
            preprocessed_product.save()


def scrape(category):
    amazon(category)
    sephora(category)
