# pip install --upgrade firebase-admin
#pip install firebase_admin

from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import firestore, credentials, auth
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import base64
from email import message_from_bytes
from google.oauth2 import service_account




from gmailapitesting import getEmails
from gpt import summarize

app = Flask(__name__)
CORS(app)


# fb_app = firebase_admin.initialize_app()
# db = firestore.client()
cred = credentials.Certificate('firebase-credentials-python.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

def create_credentials(google_token, refresh_token, client_id, client_secret):
    return Credentials(
        token=google_token,
        refresh_token=refresh_token,
        token_uri='https://oauth2.googleapis.com/token',
        client_id=client_id,
        client_secret=client_secret
    )
def get_gmail_service(google_token):
    # Create credentials using the provided token
    credentials = Credentials(token=google_token)
    # Build the Gmail service
    service = build('gmail', 'v1', credentials=credentials)
    return service


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

@app.route('/getemails', methods=['POST'])
def get_emails_route():
    try:
        data = request.get_json()  # Use get_json() for more robust JSON parsing
        print("Received data:", data)  # Debugging statement
        google_token = data.get('token') if data else None
        print('google_token is', google_token)  
        if not google_token:
            return jsonify({"error": "Google token is missing"}), 400

        # Initialize the Gmail service with the given token
        service = get_gmail_service(google_token)

        # Fetch emails using the Gmail API
        results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=5).execute()
        messages = results.get('messages', [])

        processedEmailList = []
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id'], format='raw').execute()

            msg_raw = base64.urlsafe_b64decode(msg['raw'])
            mime_msg = message_from_bytes(msg_raw)

            subject = mime_msg['subject'] if mime_msg['subject'] else None
            sender = mime_msg['from'] if mime_msg['from'] else None
            body = mime_msg.get_payload(decode=True) if not mime_msg.is_multipart() else None

            processedEmail = {
                "Subject": subject,
                "Sender": sender,
                "Body": base64.b64encode(body).decode('utf-8') if body else None
            }
            processedEmailList.append(processedEmail)

        return jsonify(processedEmailList)

    except Exception as e:
        app.logger.error(f"Exception occurred: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500


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

