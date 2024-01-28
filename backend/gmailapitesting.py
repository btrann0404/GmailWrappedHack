import os.path
import base64
from email import message_from_bytes
from gpt import summarize, categorize
import json

import firebase_admin
from firebase_admin import credentials, firestore
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


# Main function getEmails takes a list of email addresses, finds matching tokens in the user_tokens collections
# of our database, and then returns a list of dictionaries with the form:
# [{"Subject": subject, "Sender": sender, "Body": body, "Datetime": datetime}, ...]

# The secondary function organize emails takes that list of dictionaries and then runs them through categorize()
# Which is a function in gpt.py that categorizes them into one of the keywords/categories that was passed in from
# get-users-emails.jsx. Returns a dictionary of all the categories. each key is a category and
# each of those has a list of the emails like this: {Tech: [], Business: [], School: []}

# Third function called for subject lines but doesn't have much use as of now. 

# Scopes required by the application
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/userinfo.email']

def getEmails(email_addresses):
    all_emails = []
    
    if not firebase_admin._apps:
        cred = credentials.Certificate('path/to/your/firebase-credentials.json')
        firebase_admin.initialize_app(cred)

    db = firestore.client()

    for email_address in email_addresses:
        # Fetch the token for the current email address from Firebase
        token_doc = db.collection('user_tokens').document(email_address).get()
        if token_doc.exists:
            token_data = token_doc.to_dict().get('token')
            if token_data:
                token_info = json.loads(token_data)  # Convert the JSON string back to a dictionary
                creds = Credentials.from_authorized_user_info(token_info, SCOPES)

                # Check if credentials are valid, refresh if necessary
                if not creds.valid:
                    if creds.expired and creds.refresh_token:
                        creds.refresh(Request())

                service = build('gmail', 'v1', credentials=creds)

                results = service.users().messages().list(userId='me', labelIds=['INBOX', 'CATEGORY_PERSONAL'], maxResults=10).execute()
                messages = results.get('messages', [])
    
                for message in messages:
                    msg = service.users().messages().get(userId='me', id=message['id'], format='raw').execute()

                    msg_raw = base64.urlsafe_b64decode(msg['raw'])
                    mime_msg = message_from_bytes(msg_raw)

                    subject = None
                    sender = None
                    body = None
                    datetime = None

                    # Extract Subject and From from email headers
                    if mime_msg['subject']:
                        subject = mime_msg['subject']
                    if mime_msg['from']:
                        sender = mime_msg['from']
                    if mime_msg['date']:
                        datetime = mime_msg['date']

                    # Extract body
                    if mime_msg.is_multipart():
                        for part in mime_msg.walk():
                            ctype = part.get_content_type()
                            cdispo = str(part.get('Content-Disposition'))

                            # Skip any text/plain (txt) attachments
                            if ctype == 'text/plain' and 'attachment' not in cdispo:
                                body = part.get_payload(decode=True)  # decode
                                break
                        # Non-multipart emails, so the payload is just the raw content
                    else:
                        body = mime_msg.get_payload(decode=True)
                    
                    all_emails.append({"Subject": subject, "Sender": sender, "Body": body, "Datetime": datetime})

    return all_emails

def organizeEmails(emailList, categories, banned):  
    # emailList is a list of emails with the subject, sender, body, date
    category_lists = {category: [] for category in categories}
    category_lists["Miscellaneous"] = []

    for email in emailList:
        tempemail = categorize(email["Body"].decode('utf-8', errors='replace'), categories, banned)
        if tempemail in category_lists:
            category_lists[tempemail].append(email)
    for category, emails in category_lists.items():
        category_lists[category] = sorted(emails, key=lambda x: x['Datetime'], reverse=True)
    print("organizeEmails worked!")
    return category_lists  # returns a dictionary of all the categories. each key is a category and each of those has a list of the emails

def getSubjectLines(emailList):
    subjectLines = []
    for email in emailList:
        subjectLines.append(email["Subject"] + " " + email["Sender"])
    return subjectLines

if __name__ == '__main__':
    emailList = getEmails()
    print(organizeEmails(emailList, ["Technology", "Business", "School"]))