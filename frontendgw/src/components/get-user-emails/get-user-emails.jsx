import { useState } from "react";
import axios from "axios";
import db from "../../firebaseConfig";
import { query, collection, where, getDocs } from "firebase/firestore";

const GetUsersEmails = () => {
  const [email, setEmail] = useState("");
  const [userEmails, setUserEmails] = useState([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // First, get the categories associated with the entered email
      const userCategories = await getCategories(email);

      // Then, send both the email and categories to your Flask backend
      const response = await axios.post("http://localhost:5000/getemails", {
        email,
        categories: userCategories,
      });

      // Assuming the response data is the list of user emails
      setUserEmails(response.data);
    } catch (err) {
      console.error("Error fetching user emails:", err);
      setError("Failed to fetch user emails.");
    }
  };

  const getCategories = async (email) => {
    const usersRef = collection(db, "matt_users_test");
    const q = query(usersRef, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const userData = [];

      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });

      // Assuming "keywords" is the field you want to extract
      const userCategories = userData.map((data) => data.keywords);
      console.log(userCategories);

      // Update the state with the retrieved categories
      setCategories(userCategories.flat()); // Flatten the array if needed

      return userCategories;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> */}
        <button type="submit" className="outline bg-cyan-300">
          Look at Emails
        </button>
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
