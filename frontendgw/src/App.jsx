<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import SplitScreen from './SplitScreen';
import './App.css';

const App = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [welcomeScreenFaded, setWelcomeScreenFaded] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setShowWelcomeScreen(false);
      setWelcomeScreenFaded(true);
    }, 3000);

    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div className={`app-container ${welcomeScreenFaded ? 'fade-out' : ''}`}>
      {showWelcomeScreen ? (
        <WelcomeScreen />
      ) : (
        <SplitScreen />
      )}
    </div>
=======
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import { AuthProvider } from "./components/protectroute/AuthProvider";
import ProtectedRoute from "./components/protectroute/ProtectedProvider";

const Home = React.lazy(() => import("./pages/Home"));
const Main = React.lazy(() => import("./pages/Main"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
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
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </>
>>>>>>> ae181364c84dc2e7923cc6be4f43a32976a21dc6
  );
};

export default App;