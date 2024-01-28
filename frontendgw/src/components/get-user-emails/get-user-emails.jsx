import { useState, useEffect } from "react";
import axios from "axios";
import { db } from "../../firebase/firestoreService";
import { doc, getDoc } from "firebase/firestore";
import { useUserInfo } from "../../firebase/firebaseAuth";
import { RepeatIcon } from '@chakra-ui/icons'


const GetUsersEmails = ({ onDataFetched }) => {
  const [userEmails, setUserEmails] = useState([]);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false); // State to track initial load
  const currentUser = useUserInfo();

  useEffect(() => {
    const fetchData = async () => {
      setError("");

      try {
        const userEmails = await getUserEmailsById(currentUser.uid);
        const userCategories = await getCategories(currentUser.uid);

        const response = await axios.post("http://localhost:5000/getemails", {
          emails: userEmails,
          categories: userCategories,
        });

        setUserEmails(response.data);
        onDataFetched(response.data);
        setLoaded(true); // Set loaded to true after initial load
      } catch (err) {
        console.error("Error fetching user emails:", err);
        setError("Failed to fetch user emails.");
      }
    };

    // Run the initial data fetch when the component is loaded
    if (!loaded) {
      fetchData();
    }
  }, [currentUser, loaded, onDataFetched]);

  const getCategories = async (currentUser) => {
    const userRef = doc(db, "profiles", currentUser);
    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setCategories(userDoc.data().keywords);
        return userDoc.data().keywords;
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  };

  const getUserEmailsById = async (currentUser) => {
    const userRef = doc(db, "profiles", currentUser);
    try {
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        return userDoc.data().gmail_list;
      } else {
        console.log("No such user!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  };

  const handleFetchData = async () => {
    // Trigger data fetch when the button is clicked
    setLoaded(false); // Set loaded to false to re-run initial fetch
  };

  return (
    <div>
      <button onClick={handleFetchData} className="w-12 h-12 rounded-full text-lg flex items-center justify-center" style={{ fontSize: "2em", margin: "0.1em"}}>
        <RepeatIcon />
      </button>

      {/* {error && <p>Error: {error}</p>}

      {categories.length > 0 && (
        <div>
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
      )} */}
    </div>
  );
};

export default GetUsersEmails;
