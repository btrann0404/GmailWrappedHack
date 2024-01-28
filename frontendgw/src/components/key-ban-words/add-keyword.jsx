import axios from "axios";
import { useUserInfo } from "../../firebase/firebaseAuth";

// user id is passed in to link emails to id
export const AddKeyword = async (key) => {
  const currentUser = useUserInfo();
    try {
        // try to authenticate
        const response = await axios.post("http://localhost:5000/addkeyword", {userID: currentUser.uid, keyword: key});
        console.log(response)

    } catch (err) {
        console.error("Error fetching", err);
    }
  };
