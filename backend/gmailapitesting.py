import os.path
import base64
from email import message_from_bytes
from gpt import summarize, categorize
from googleapiclient.discovery import build
from google.auth.transport.requests import Request


from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials


# Scopes required by the application
# SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def get_gmail_service(google_token):
    creds = Credentials(token=google_token)
    return build('gmail', 'v1', credentials=creds)

def getEmails(google_token):
    try:
        service = get_gmail_service(google_token)
        results = service.users().messages().list(userId='me', labelIds=['INBOX'], maxResults=5).execute()
        messages = results.get('messages', [])
        emails = []

        if not messages:
            print('No messages found.')
            return emails

        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id'], format='raw').execute()
            msg_raw = base64.urlsafe_b64decode(msg['raw'])
            mime_msg = message_from_bytes(msg_raw)

            subject = mime_msg['subject'] if mime_msg['subject'] else None
            sender = mime_msg['from'] if mime_msg['from'] else None
            body = mime_msg.get_payload(decode=True) if not mime_msg.is_multipart() else None

            if mime_msg.is_multipart():
                for part in mime_msg.walk():
                    if part.get_content_type() == 'text/plain' and part.get('Content-Disposition') is None:
                        body = part.get_payload(decode=True)
                        break

            emails.append({"Subject": subject, "Sender": sender, "Body": body})

        return emails

    except Exception as e:
        print(f"An error occurred: {e}")
        return []


if __name__ == '__main__':
    emailList = getEmails()
    for i in range(3):
        print(emailList[i]["Body"].decode('utf-8') + "\n\n\n\n\n\n")
    for i in range(3):
        email_body_str = emailList[i]["Body"].decode('utf-8')
        print(summarize(email_body_str))
        print(categorize(email_body_str, ["Technology", "Business", "School"]))
        

