# pip install --upgrade firebase-admin
#pip install firebase_admin

from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore, credentials
from google.cloud.firestore_v1 import ArrayUnion

from gmailapitesting import getEmails, organizeEmails, getSubjectLines
from gpt import summarize

app = Flask(__name__)
CORS(app)


# fb_app = firebase_admin.initialize_app()
# db = firestore.client()
cred = credentials.Certificate('firebase-credentials-python.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route("/home") #dont need
def home():
    print({"home", "here"})

@app.route('/summarize-article') #deal with later
def summarize_article_route():
    emails = getEmails()
    email_body_str = emails[0]["Body"].decode('utf-8')
    return summarize(email_body_str)

@app.route('/getemails', methods=['POST']) 
def get_emails_route():
    data = request.get_json()
    categories = data.get('categories')
    emailList = getEmails()  # Call your getEmails function
    subjectLines = getSubjectLines(emailList)
    print("Subject lines:", subjectLines)
    organizedEmails = organizeEmails(emailList, categories)

    # Query the user document by email
    user_ref = db.collection('matt_users_test').where(field_path='email', op_string='==', value="matt@gmail.com").limit(1)
    docs = user_ref.stream() #doesnt work
    user_doc_ref = None
    for doc in docs:
        user_doc_ref = doc.reference
        break

    # Update the user document with new subject lines
    if user_doc_ref:
        user_doc_ref.update({
            'subjectLines': subjectLines
        })

    for category, emails in organizedEmails.items():
        for email in emails:
            if email.get('Body') is not None:
                email['Body'] = email['Body'].decode('utf-8')

    return jsonify(organizedEmails)

if __name__ == "__main__":
    app.run(debug=True)

