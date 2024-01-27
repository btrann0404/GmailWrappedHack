import "./App.css";
import { addData } from "./firestoreService";
import { addUser } from "./components/firebaseAddUser/firebaseAddUser";
import UserForm from "./components/user-form-test/userform";
import UserSearchForm from "./components/userSearchForm/userSearchForm";
import { getUserByEmail } from "./components/firebaseGetUserInfo/firebaseGetUserInfo";
import GetUsersEmails from "./components/get-user-emails/get-user-emails";

function App() {

  return (
    <>
        <button onClick={addData}>Add to DB</button>
        <UserForm addUser = {addUser}></UserForm>
        <UserSearchForm getUserByEmail={getUserByEmail}></UserSearchForm>
        <GetUsersEmails></GetUsersEmails>
    </>
  );
}

export default App;
