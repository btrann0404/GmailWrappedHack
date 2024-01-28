# pip install --upgrade firebase-admin
# pip install firebase_admin

from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore, credentials
from google.cloud.firestore_v1 import ArrayUnion
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from gmailapitesting import getEmails, organizeEmails, getSubjectLines
from gpt import summarize

app = Flask(__name__)
CORS(app)


# get_user_email extracts an email from the authentication process
# authenticate_user runs authentication process and adds token to the database along with associated email
# /summarize-article route is for one article summarization
# /getemails calls the functions in gmailapitesting.py and returns the jsonified emails within their categories
# /authenticate-user route just runs the top two functions to authenticate user


# Scopes required by the application
SCOPES = ['https://www.googleapis.com/auth/userinfo.profile', 'openid', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/userinfo.email']

# fb_app = firebase_admin.initialize_app()
# db = firestore.client()
cred = credentials.Certificate('firebase-credentials-python.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

def get_user_email(creds):
    # Build the service for the People API
    people_service = build('people', 'v1', credentials=creds)
    # Get the user's email address
    profile = people_service.people().get(resourceName='people/me', personFields='emailAddresses').execute()
    # Extract the email address from the response
    email_address = profile.get('emailAddresses', [])[0].get('value')
    return email_address

def authenticate_user(id):
    # This function initiates the OAuth2 flow and handles user authentication
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json', SCOPES)
    # Run the local server to complete the OAuth2 flow
    creds = flow.run_local_server(port=8081)
    # After successful authentication, store the credentials in Firebase
    user_email = get_user_email(creds)

    print(user_email)

    # Update the user's profile with the new email
    profile_ref = db.collection('profiles').document(id).get()
    profile_data = profile_ref.to_dict()
    profile_ref = db.collection('profiles').document(id)

    print(profile_data)
    print(id)

    # Append the new email to the existing list
    profile_data['gmail_list'].append(user_email)

    # Update the profile data in Firestore
    profile_ref.set(profile_data)

    db.collection('user_tokens').document(user_email).set({
        'token': creds.to_json()    
    })

    return "worked"



@app.route("/home") #dont need
def home():
    print({"home", "here"})

@app.route('/summarize-article', methods=['POST']) #deal with later
def summarize_article_route():
    data = request.get_json()
    text = data.get('body')
    print(text[:20])
    return summarize(text)

@app.route('/getemails', methods=['POST']) 
def get_emails_route():
    data = request.get_json()
    emails = data.get('emails')
    categories = data.get('categories')
    emailList = getEmails(emails)  # Call your getEmails function
    #subjectLines = getSubjectLines(emailList)
    organizedEmails = organizeEmails(emailList, categories)

    for category, emails in organizedEmails.items():
        for email in emails:
            if email.get('Body') is not None:
                email['Body'] = email['Body'].decode('utf-8', errors='replace')

    return jsonify(organizedEmails)


@app.route("/authenticate-user", methods=['POST'])
def authenticate_user_route():
    data = request.get_json()
    id = data.get('userID')
    outcome = authenticate_user(id)
    return outcome

@app.route("/addkeyword", methods=['POST'])
def add_keyword_route():
    data = request.get_json()
    id = data.get('userID')
    keyword = data.get('keyword')

    profile_ref = db.collection('profiles').document(id).get()
    profile_data = profile_ref.to_dict()
    profile_ref = db.collection('profiles').document(id)

    # Append the new email to the existing list
    profile_data['keywords'].append(key)

    # Update the profile data in Firestore
    profile_ref.set(profile_data)
    return 200

@app.route("/addbannedword", methods=['POST'])
def add_bannedword_route():
    data = request.get_json()
    id = data.get('userID')
    banwords = data.get('bannedword')

    profile_ref = db.collection('profiles').document(id).get()
    profile_data = profile_ref.to_dict()
    profile_ref = db.collection('profiles').document(id)

    # Append the new email to the existing list
    profile_data['bannedwords'].append(banword)

    # Update the profile data in Firestore
    profile_ref.set(profile_data)
    return 200


if __name__ == "__main__":
    app.run(debug=True)

