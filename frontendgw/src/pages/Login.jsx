import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  useUserInfo,
  signOutUser,
} from "../firebase/firebaseAuth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useUserInfo();

  useEffect(() => {
    if (user) {
      console.log("User is already logged in. Signing out...");
      signOutUser().then(() => {
        console.log("User signed out successfully.");
      });
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginWithEmail(email, password);
    navigate("/main");
  };

  return (
    <div>
      <button className="p-2" onClick={() => navigate("/")}>
        Home Page
      </button>
      <h2>Login</h2>
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
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
}

export default Login;
