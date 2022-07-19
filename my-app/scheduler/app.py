from flask import Flask
from flask_apscheduler import APScheduler
import mongoengine as me
from associate_rule_mining import association_rule_mining
from datetime import datetime
from flask_mongoengine import MongoEngine
from web_scraping import scrape
import logging
import datetime


app = Flask(__name__)
scheduler = APScheduler()
app.config['MONGODB_SETTINGS'] = {
    'host': f'mongodb+srv://user123:cJy9tubHxcPGylwc@cluster0.bjotw.mongodb.net/Sentiviews.?retryWrites=true&w=majority'
}

MongoEngine(app)

@app.route("/")
def hello():
    return "Welcome to the Scheduler ---"

def AssociationRuleMining():
    print("Current Task: Association Rule Mining")
    start = datetime.datetime.now()
    association_rule_mining()
    end = datetime.datetime.now()
    duration = end - start
    print(f"Association Rule Mining Ended. Duration: {duration}")

def Scrape():
    print("Current Task: Updating Reviews and Sentiment Score")
    day = datetime.datetime.today().weekday()
    start = datetime.datetime.now()

    if day == 0:
        scrape("Lipstick")
    
    if day == 1:
        scrape("Foundation")
        scrape("Eyebrows")
    
    if day == 2:
        scrape("Foundation")

    if day == 3:
        scrape("Mascara")

    if day == 4:
        scrape("Eyeliner")

    if day == 5:
        scrape("Primer")

    if day == 6:
        scrape("Facial Cleanser")    
        scrape("Scrub")    
    
    end = datetime.datetime.now()
    duration = end - start
    print(f"Updating Reviews and Sentiment Score Completed. Duration: {duration}")


if __name__ == '__main__':
    scheduler.add_job(id ='Scheduled Task 1', func = AssociationRuleMining, trigger='cron', day_of_week ='mon-sun', hour=0, minute=0 )
    scheduler.add_job(id ='Scheduled Task 2', replace_existing= True, func = Scrape, trigger='cron', day_of_week ='mon-sun', hour=1, minute=0 )

    logging.basicConfig()
    logging.getLogger('apscheduler').setLevel(logging.DEBUG)
    scheduler.start()
    app.run(host = '0.0.0.0', port = 8081)