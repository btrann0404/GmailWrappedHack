import { useState } from "react";
import axios from "axios";

const GetUsersEmails = () => {
  const [email, setEmail] = useState("");
  const [userEmails, setUserEmails] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/getemails");
      setUserEmails(response.data); // Assuming the response data is the list of user emails
    } catch (err) {
      console.error("Error fetching user emails:", err);
      setError("Failed to fetch user emails.");
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

      <div>
        <h2 className="underline">User Emails</h2>
        {userEmails.map((emailData, index) => (
          <div key={index}>
            <p>Subject: {emailData.Subject}</p>
            <p>Sender: {emailData.Sender}</p>
            <p>Body: {emailData.Body}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetUsersEmails;
