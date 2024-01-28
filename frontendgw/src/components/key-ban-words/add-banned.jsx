import axios from "axios";
import { useUserInfo } from "../../firebase/firebaseAuth";

// user id is passed in to link emails to id
export const AddKeyword = async (word) => {
  const currentUser = useUserInfo();
    try {
        // try to authenticate
        const response = await axios.post("http://localhost:5000/addbannedword", {userID: currentUser.uid, bannedword: word});
        console.log(response)

    } catch (err) {
        console.error("Error fetching", err);
    }
  };
