import React, { useState } from "react";
import { signUpWithEmail } from "../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous errors
    setError("");

    // Check if passwords match
    if (password !== password2) {
      setError("Passwords do not match.");
      return; // Stop the submission if passwords don't match
    }

    try {
      await signUpWithEmail(email, password);
      navigate("/example"); // Redirect on successful sign up
    } catch (err) {
      setError(err.message); // Display a user-friendly error message
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            className="outline"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="outline"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            className="outline"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
