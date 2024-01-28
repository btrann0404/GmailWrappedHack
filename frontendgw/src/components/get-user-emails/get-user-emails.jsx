import { useState } from "react";
import axios from "axios";
import db from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";


// Collects emails based on signed in user's ID (yet to implement)
// then makes a post request to server.py with a list of the user's categories/keywords
// and a list of emails for the Gmail API

// handleSubmit is what occurs when a user will click "Add Google Account" and has two sub functions to work
// the first is getUserEmailsById which uses the user's id to get their emails from the database
// the second is getCategories which uses the user's keywords/categories in the same way
// After the post request emails are being displayed below in HTML with mapping to put them in their
// correct order and categories

const GetUsersEmails = () => {
  const [userEmails, setUserEmails] = useState([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // First, get the categories associated with the entered email
      const userEmails = await getUserEmailsById()
      const userCategories = await getCategories();

      // Then, send both the email and categories to your Flask backend
      const response = await axios.post("http://localhost:5000/getemails", {
        emails: userEmails,
        categories: userCategories,
      });

      // Assuming the response data is the list of user emails
      console.log("returned")
      console.log(response.data)
      setUserEmails(response.data);
    } catch (err) {
      console.error("Error fetching user emails:", err);
      setError("Failed t  o fetch user emails.");
    }
  };

  const getCategories = async (/** needs to be user id **/) => {
    const userRef = doc(db, "profiles", "ZVtOCmDuhOYHZD96WPPrmE7cLrJ3");
      try {
        const userDoc = await getDoc(userRef);
    
        if (userDoc.exists()) {
          console.log("User data:", userDoc.data());
          setCategories(userDoc.data().keywords);
          return userDoc.data().keywords;
        }
      } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
      }
    };

  const getUserEmailsById = async (/** needs to be user id **/) => {
    const userRef = doc(db, "profiles", "ZVtOCmDuhOYHZD96WPPrmE7cLrJ3");
    try {
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
        console.log("User data:", userDoc.data());
        return userDoc.data().gmail_list; // Assuming the email field is named 'email'
      } else {
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };


  return (
  <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>

      {error && <p>Error: {error}</p>}

      <h2>User Emails</h2>
      {categories.map((category, index) => (
        <div key={index}> 
          <h3>{category}</h3>
          {userEmails[category]?.map((emailData, emailIndex) => (
            <div key={emailIndex}>
              <p>Subject: {emailData.Subject}</p>
              <p>Sender: {emailData.Sender}</p>
              <p>Body: {emailData.Body}</p>
              <hr />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GetUsersEmails;