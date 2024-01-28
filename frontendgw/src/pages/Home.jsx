import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../firebase/firebaseAuth";
import "./Home.css"

const Home = () => {
  const navigate = useNavigate();
  const user = useUserInfo();

  return (
    <>
      <header className="headerStyle">
        <img className="logo" src="" alt="Gmail Wrapped"></img>
        <nav>
          <ul className="navStyle">
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>

      {user && (
        <button className="p-2" onClick={() => navigate("/main")}>
          Back To Main
        </button>
      )}
      <h1>This is Home</h1>
      <div className="card">
        <button className="p-2" onClick={() => navigate("/login")}>
          Login Here
        </button>
        <button className="p-2" onClick={() => navigate("/signup")}>
          Signup Here
        </button>
      </div>
    </>
  );
};

export default Home;
