import axios from "axios";

export const AddKeyword = async (key, currentUser) => {
  try {
    // Use the `currentUser` argument here
    const response = await axios.post("http://localhost:5000/addkeyword", { userID: currentUser.uid, keyword: key });
    console.log(response);
  } catch (err) {
    console.error("Error fetching", err);
  }
};
