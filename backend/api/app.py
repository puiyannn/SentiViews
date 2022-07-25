from unicodedata import category
from categorical_search import new_get_sentiment_cat
from association import get_associated_products
from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from schema import Products
from schema import Ranked_Products
from schema import Preprocessed_Products
from schema import Favourited
from schema import Viewed
from schema import User
from sentiment_scoring import get_sentiment
from product_info import get_info
from product_info import get_info
from bson.objectid import ObjectId
from datetime import datetime
from operator import itemgetter
from comparison import get_comparison
import os
import json
import re
import mongoengine as me


load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
app = Flask(__name__)
app.secret_key = b'\xa3#\xd96\xd6\xb0\x9b\xe5\xc3\x1c\xf3\x914\x96\x95z\123'
CORS(app)
# app.config['MONGODB_SETTINGS'] = {
#     'host': f'mongodb+srv://user123:cJy9tubHxcPGylwc@cluster0.bjotw.mongodb.net/Sentiviews.?retryWrites=true&w=majority'
#}
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost:27017/fyp.?retryWrites=true&w=majority'
}
    
MongoEngine(app)


@app.route("/products/<category>/<pageNumber>")
def get(category,pageNumber):
    amount = Ranked_Products.objects(category=category).count()
    firstIndex = (int(pageNumber)-1)*15
    lastIndex = firstIndex+15

    items = Ranked_Products.objects(category=category).order_by('-sentiment')
    products = items[firstIndex:lastIndex]

    return jsonify(amount=amount,products=products)


@app.route("/featured/<pageNumber>", methods=['GET','POST'])
def featured(pageNumber):
    content = request.json
    f1 = content.get("f1")
    f2 = content.get("f2")
    f3 = content.get("f3")
    f4 = content.get("f4")
    f5 = content.get("f5")
    category = content.get("category")

    products = get_sentiment(f1,f2,f3,f4,f5,category)
    amount = len(products)
    firstIndex = (int(pageNumber)-1)*15
    lastIndex = firstIndex+15
    
    return jsonify(amount=amount,products=products[firstIndex:lastIndex])


@app.route("/searchInCategory", methods=['GET','POST'])
def searchInCategory():
    content = request.json
    f1 = content.get("f1")
    f2 = content.get("f2")
    f3 = content.get("f3")
    f4 = content.get("f4")
    f5 = content.get("f5")
    category = content.get("category")
    searchTerm = content.get("searchTerm")

    products = new_get_sentiment_cat(f1,f2,f3,f4,f5,category,searchTerm)
    amount = len(products)
    
    return jsonify(amount=amount,products=products)


@app.route("/product/<id>", methods=['GET','POST'])
def product(id):
    if request.method == 'POST':
        content = request.json
        f1 = content.get("f1")
        f2 = content.get("f2")
        f3 = content.get("f3")
        f4 = content.get("f4")
        f5 = content.get("f5")
        product = get_info(f1,f2,f3,f4,f5,id)
        associated_products = get_associated_products(id)
        
    return jsonify(product=product,associated_products=associated_products)



@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        content = request.json
        username = content.get("username")
        email = content.get("email")
        password = content.get("password")

        if not User.objects(email=email):
            user = User(
                username = username,
                email = email,
                password = generate_password_hash(password),
            )
            user.save()

        else:
            error = 'This email already exists.'
            print(error)
            return jsonify({"error":error})

    return jsonify({"message":'Sucessfully Registered'})


@app.route("/signin", methods=['GET', 'POST'])
def signin():
    user_id = session.get('user_id')

    if request.method == 'POST':
        content = request.json
        email = content.get("email")
        password = content.get("password")

        users = User.objects(email=email)
        users = json.loads(users.to_json())
        error = None

        try:
            user = users[0]
            
        except IndexError:
            error = 'Incorrect email. Please enter again.'
            print(error)
            return jsonify({"error":error})

        if not check_password_hash(user['password'], password):
            error = 'Incorrect password. Please enter again.'
            print(error)
            return jsonify({"error":error})

        if error is None:
            session.clear()
            session.permanent = True
            session['user_id'] = user['_id']['$oid']
            username = user["username"]

    return jsonify({"message":f'Welcome back, {username}!'})


@app.route('/signout')
def logout():
    session.clear()
    return 'Done!'

@app.route('/logstatus')
def logstatus():
    user_id = session.get("user_id")

    if user_id is None:
        return jsonify({"status":False}), 400

    else:
        return jsonify({"status":True}), 200

@app.route('/favourite')
def favourite():
    current_id = session.get("user_id")

    if current_id is None:
        return 'ERROR'

    else:
        user = User.objects.get(_id=current_id)
        user = json.loads(user.to_json())

        favourite_products = user['favourited']

        return jsonify(products=favourite_products)

@app.route('/viewed')
def viewed():
    current_id = session.get("user_id")

    if current_id is None:
        return 'Not signed in'

    else:
        user = User.objects.get(_id=current_id)
        user = json.loads(user.to_json())

        viewed_products = user['viewed']

        return jsonify(products=viewed_products)


@app.route('/checkfav',methods=['GET'])
def checkFav():
    current_id = session.get("user_id")
    user = User.objects.get(_id=current_id)
    user = json.loads(user.to_json())
    fav_products = user['favourited']

    product_id_list = []
    for i in range(len(fav_products)):
        product_id = fav_products[i]['_id']['$oid']
        product_id_list.append(product_id) 

    return jsonify(fav_product_ids=product_id_list)


@app.route('/updatefavlist', methods=['POST'])
def updateFavList():
    content = request.json
    id = content.get("id")
    name = content.get("name")
    price = content.get("price")
    image_url = content.get("image_url")

    product = Preprocessed_Products.objects.get(_id=content.get("id"))
    url = product.url
    category = product.category

    fav = Favourited(
        _id = id,
        name = name,
        price = price,
        url = url,
        image_url = image_url,
        category = category,
    )

    current_id = session.get("user_id")
    user = User.objects.get(_id=current_id)

    exist = False

    for f in user.favourited:
        if f.name == name:
            user.favourited.remove(f)
            user.save()
            exist = True        
    
    if exist == False:
        user.favourited.append(fav)
        user.save()

    return 'Done!'


@app.route('/updateviewedlist', methods=['POST'])
def updateViewedList():
    content = request.json
    id = content.get("id")
    name = content.get("name")
    price = content.get("price")
    image_url = content.get("image_url")
    product = Preprocessed_Products.objects.get(_id=content.get("id"))
    url = product.url
    category = product.category

    if name == "" or image_url == "":
        print('Viewing not completed.')

    else:
        print('done viewing...')
        viewed = Viewed(
            _id = id,
            name = name,
            price = price,
            url = url,
            image_url = image_url,
            category = category, 
        )

        current_id = session.get("user_id")
        user = User.objects.get(_id=current_id)

        exist = False

        for f in user.viewed:
            if f.name == name:
                print('111')
                user.viewed.remove(f)
                user.viewed.append(viewed)
                user.save()
                exist = True        
        
        if exist == False:
            print('hello')
            user.viewed.append(viewed)
            user.save()

    return 'Done!'

@app.route('/removeviewed', methods=['POST'])
def removeViewed():
    content = request.json
    id = content.get("id")
    name = content.get("name")

    current_id = session.get("user_id")
    user = User.objects.get(_id=current_id)

    for f in user.viewed:
        if f.name == name:
            user.viewed.remove(f)
            user.save()

    return 'Done!'

@app.route('/comparison', methods=['POST'])
def comparison():
    content = request.json
    id_list = content.get("comparisonList")

    products = get_comparison(id_list)

    return jsonify(products=products)


@app.route('/search/<searchTerm>/<pageNumber>', methods=['GET'])
def search(searchTerm,pageNumber):
    regex = re.compile(f'.*{searchTerm}.*', re.IGNORECASE)
    products = Ranked_Products.objects(name=regex)
    products = json.loads(products.to_json())

    amount = len(products)

    firstIndex = (int(pageNumber)-1)*21
    lastIndex = firstIndex+21
    products = products[firstIndex:lastIndex]

    return jsonify(amount=amount,products=products)


# @app.route('/testing123', methods=['GET'])
# def test123():
#     return jsonify(new_words)

if __name__ == "__main__":
    app.run(debug=True)



    

