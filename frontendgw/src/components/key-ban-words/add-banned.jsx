import axios from "axios";

export const AddBannedword = async (key, currentUser) => {
  try {
    // Use the `currentUser` argument here
    const response = await axios.post("http://localhost:5000/addbannedword", { userID: currentUser.uid, bannedword: key });
    console.log(response);
  } catch (err) {
    console.error("Error fetching", err);
  }
};
