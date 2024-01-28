import axios from "axios";

// for now email is just getting chosen from the gmail api call. but eventually email here will be a list of emails that need to get checked.
const AuthenticateUser = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // try to authenticate
      const response = await axios.post("http://localhost:5000/authenticate-user");
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