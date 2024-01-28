// for testing. creates a form that returns all user info when submitted

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const UserSearchForm = ({ getUserByEmail }) => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setUserData(null);

    try {
      const data = await getUserByEmail(email);
      if (data.length > 0) {
        setUserData(data[0]); // Assuming only one user per email
      } else {
        setError("No user found with that email.");
      }
    } catch (error) {
      setError("An error occurred while fetching user data.");
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        {/* <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter user email"
          required
        /> */}
        {/* <button type="submit">Search</button> */}
      </form>
      {userData && <div>{JSON.stringify(userData)}</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default UserSearchForm;
