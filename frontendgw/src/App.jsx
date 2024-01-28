// import React, { useState, useEffect } from 'react';
// import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
// import SplitScreen from './SplitScreen';
// import './App.css';

// const App = () => {
//   const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
//   const [welcomeScreenFaded, setWelcomeScreenFaded] = useState(false);

//   useEffect(() => {
//     const fadeTimer = setTimeout(() => {
//       setShowWelcomeScreen(false);
//       setWelcomeScreenFaded(true);
//     }, 3000);

//     return () => clearTimeout(fadeTimer);
//   }, []);

//   return (
//     <div className={`app-container ${welcomeScreenFaded ? 'fade-out' : ''}`}>
//       {showWelcomeScreen ? (
//         <WelcomeScreen />
//       ) : (
//         <SplitScreen />
//       )}
//     </div>

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { AuthProvider } from "./components/protectroute/AuthProvider";
import ProtectedRoute from "./components/protectroute/ProtectedProvider";
import { CircularProgress } from "@chakra-ui/react";

const Home = React.lazy(() => import("./pages/Home"));
const Main = React.lazy(() => import("./pages/Main"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Suspense
            fallback={
              <CircularProgress
                className="absolute justify-center"
                value={59}
                size="100px"
                thickness="4px"
              />
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/main"
                element={
                  <ProtectedRoute>
                    <Main />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profilepage"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
