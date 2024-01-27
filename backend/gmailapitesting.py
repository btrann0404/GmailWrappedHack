import os.path
import base64
from email import message_from_bytes
from gpt import summarize, categorize


from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Scopes required by the application
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def getEmails():
    # Step 1: User Authentication and Authorization
    creds = None
    emails = []
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=8080)
            # Save the credentials for the next run
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    # Step 2: Build the Gmail service
    service = build('gmail', 'v1', credentials=creds)

    # Step 3: List the first 5 email messages in the user's inbox
    results = service.users().messages().list(userId='me', labelIds=['INBOX', 'CATEGORY_PERSONAL'], maxResults=5).execute()
    messages = results.get('messages', [])
    
    if not messages:
        print('No messages found.')
    else:
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id'], format='raw').execute()

            # Decode email raw data
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
            
            emails.append({"Subject": subject, "Sender": sender, "Body": body, "Datetime": datetime})

        return emails

def organizeEmails(emailList, categories):  
    # emailList is a list of emails with the subject, sender, body, date
    category_lists = {category: [] for category in categories[0]}
    for email in emailList:
        tempemail = categorize(email["Body"].decode('utf-8'), categories[0])
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
    # for i in range(3):
    #     print(emailList[i]["Body"].decode('utf-8') + "\n\n\n\n\n\n")
    # for i in range(3):
    #     email_body_str = emailList[i]["Body"].decode('utf-8')
    #     print(summarize(email_body_str))
    #     print(categorizeorgani(email_body_str, ["Technology", "Business", "School"]))
    print(organizeEmails(emailList, ["Technology", "Business", "School"]))
        

