import GetUsersEmails from "../components/get-user-emails/get-user-emails";
import AuthenticateUser from "../components/authenticate-user/authenticate-user";

const Home = () => {
  return (
    <>
      <h1>This is Home</h1>
      <GetUsersEmails></GetUsersEmails>
      <AuthenticateUser></AuthenticateUser>
    </>
  );
};

export default Home;
