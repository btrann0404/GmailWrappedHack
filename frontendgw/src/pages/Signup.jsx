import { signInWithGoogle } from "../firebase/firebaseAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const googleToken = await signInWithGoogle();
      // Send the token to your backend or handle it as needed
      console.log(googleToken);
      await axios.post("http://localhost:5000/getemails", {
        token: googleToken,
      });
      navigate("/example");
    } catch (error) {
      console.error("Error during sign in with Google:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <button onClick={handleGoogleSignIn}>Sign In With Google</button>
    </div>
  );
}

export default Signup;
