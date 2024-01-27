# pip install --upgrade firebase-admin
#pip install firebase_admin

from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore, credentials

from gmailapitesting import getEmails, organizeEmails
from gpt import summarize

app = Flask(__name__)
CORS(app)


# fb_app = firebase_admin.initialize_app()
# db = firestore.client()
cred = credentials.Certificate('firebase-credentials-python.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route("/home")
def home():
    print({"home", "here"})

@app.route('/add-data')
def add_data_route():
    add_data()
    return "worked!"

@app.route('/summarize-article')
def summarize_article_route():
    emails = getEmails()
    email_body_str = emails[0]["Body"].decode('utf-8')
    return summarize(email_body_str)

@app.route('/getemails', methods=['GET', 'POST'])
def get_emails_route():
    data = request.get_json()
    categories = data.get('categories')
    emailList = getEmails()  # Call your getEmails function
    organizedEmails = organizeEmails(emailList, categories)

    # print("in server.py")
    # print(organizedEmails)

    for category, emails in organizedEmails.items():
        for email in emails:
            if email.get('Body') is not None:
                email['Body'] = email['Body'].decode('utf-8')

    # print(organizedEmails)

    return jsonify(organizedEmails)

def add_data():
    # Reference to the collection
    collection_ref = db.collection('your_collection_name')

    # Data to be added
    doc_data = {
        'field1': 'value1',
        'field2': 'value2',
    }

    # Actually Add
    collection_ref.add(doc_data)

    return

if __name__ == "__main__":
    app.run(debug=True)

