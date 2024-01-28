import axios from "axios";
import { useUserInfo } from "../../firebase/firebaseAuth";

// user id is passed in to link emails to id
const AuthenticateUser = () => {
  const currentUser = useUserInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // try to authenticate
      const response = await axios.post("http://localhost:5000/authenticate-user", {userID: currentUser.uid});
      console.log(response)

    } catch (err) {
      console.error("Error fetching", err);
    }
  };

  return (
    <div>
        <button onClick={handleSubmit} style={{ border: 'solid' }}>Add Gmail Account</button>
    </div>
  );
};

export default AuthenticateUser;