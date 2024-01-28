import axios from "axios";
import { useUserInfo } from "../../firebase/firebaseAuth";
import { Button } from "@chakra-ui/react";

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
    <Button
        onClick={handleSubmit}
        colorScheme="blue"
        borderRadius="full"
        fontSize="2xl"
      >
        +
      </Button>
  );
};

export default AuthenticateUser;