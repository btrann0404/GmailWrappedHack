import axios from "axios";

export const RemoveEmail = async (email, currentUser) => {
  try {
    // Use the `currentUser` argument here
    const response = await axios.post("http://localhost:5000/removeemail", { userID: currentUser.uid, useremail: email });
    console.log(response);
  } catch (err) {
    console.error("Error fetching", err);
  }
};
