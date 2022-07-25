import mongoengine as me
import datetime

class Favourited(me.EmbeddedDocument):
    _id = me.ObjectIdField()
    name = me.StringField()
    price = me.StringField()
    url = me.StringField()
    image_url = me.StringField()
    description = me.StringField()
    platform = me.StringField()
    category = me.StringField()

class Viewed(me.EmbeddedDocument):
    _id = me.ObjectIdField()
    name = me.StringField()
    price = me.StringField()
    url = me.StringField()
    image_url = me.StringField()
    description = me.StringField()
    platform = me.StringField()
    category = me.StringField()
    date = me.DateTimeField(default=datetime.datetime.now)

class Users(me.Document):
    meta = {'collection': 'Users'}
    _id = me.ObjectIdField()
    username = me.StringField()
    email = me.EmailField()
    password = me.StringField()
    favourited = me.ListField(me.EmbeddedDocumentField(Favourited))
    viewed = me.ListField(me.EmbeddedDocumentField(Viewed))

class Review(me.EmbeddedDocument):
    username = me.StringField()
    date = me.DateTimeField()
    content = me.StringField()

class Products(me.Document):
    meta = {'collection': 'Products'}   
    _id = me.ObjectIdField() 
    name = me.StringField()
    price = me.StringField()
    url = me.StringField()
    image_url = me.StringField()
    description = me.StringField()
    platform = me.StringField()
    category = me.StringField()
    reviews = me.ListField(me.EmbeddedDocumentField(Review))
    last_reviewed = me.DateTimeField() # max date of all reviews

class Preprocessed_Review(me.EmbeddedDocument):
    username = me.StringField()
    date = me.DateTimeField()
    content = me.StringField()
    transformed_content = me.StringField()
    f1_sentiment = me.FloatField()
    f2_sentiment = me.FloatField()
    f3_sentiment = me.FloatField()
    f4_sentiment = me.FloatField()
    f5_sentiment = me.FloatField()
    cosine_similarity = me.FloatField()
    sentiment_score = me.FloatField()
    

class Preprocessed_Products(me.Document):
    meta = {'collection': 'Preprocessed_Products'}
    _id = me.ObjectIdField()
    name = me.StringField()
    price = me.StringField()
    url = me.StringField()
    image_url = me.StringField()
    description = me.StringField()
    platform = me.StringField()
    category = me.StringField()
    reviews = me.ListField(me.EmbeddedDocumentField(Preprocessed_Review))
    similarity = me.FloatField()
    f1_sentiment = me.FloatField()
    f2_sentiment = me.FloatField()
    f3_sentiment = me.FloatField()
    f4_sentiment = me.FloatField()
    f5_sentiment = me.FloatField()
    associated_products = me.ListField()
    last_reviewed = me.DateTimeField() # max date of all reviews

class Ranked_Products(me.Document):
    meta = {'collection': 'Ranked_Products'}
    _id = me.ObjectIdField()
    name = me.StringField()
    price = me.StringField()
    image_url = me.StringField()
    category = me.StringField()
    f1_sentiment = me.FloatField()
    f2_sentiment = me.FloatField()
    f3_sentiment = me.FloatField()
    f4_sentiment = me.FloatField()
    f5_sentiment = me.FloatField()
    f1_count = me.FloatField()
    f2_count = me.FloatField()
    f3_count = me.FloatField()
    f4_count = me.FloatField()
    f5_count = me.FloatField()
    sentiment = me.FloatField()
