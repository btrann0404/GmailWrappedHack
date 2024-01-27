# pip install --upgrade firebase-admin
#pip install firebase_admin

from flask import Flask
import firebase_admin
from firebase_admin import firestore, credentials

app = Flask(__name__)


fb_app = firebase_admin.initialize_app()
db = firestore.client()
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

@app.route("/home")
def home():
    print({"home", "here"})


exampledata = {
    'something': "something"
}
def examplefunc():
    doc_ref = db.collection('serverfirebase').document
    doc_ref.set(exampledata)



if __name__ == "__main__":
    examplefunc()
    # app.run(debug=True)

