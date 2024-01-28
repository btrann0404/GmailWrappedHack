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
