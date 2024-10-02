import { Spinner, Center } from "@chakra-ui/react";
import Auth from "./Pages/Auth/Auth";
import Profile from "./Pages/Profile/Profile";
import Chat from "./Pages/Chat/Chat";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from "./Store";
import apiClient from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";
import { useState, useEffect } from "react";

// Private route wrapper to protect certain routes
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// Auth route wrapper for routes like login/signup
const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  // Fetch user data on initial load
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);  // Set user info if found
        } else {
          setUserInfo(undefined);  // Clear user info if no valid data
        }
      } catch (error) {
        setUserInfo(undefined); // Handle any error during the request
      } finally {
        setLoading(false); // Ensure loading is stopped in all cases
      }
    };

    if (!userInfo) {
      getUserData(); // Fetch user data if not already available
    } else {
      setLoading(false); // Stop loading if userInfo already exists
    }
  }, [setUserInfo, userInfo]);

  // Show spinner while loading
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Auth route for login/signup */}
        <Route path="/auth" element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        }/>
        
        {/* Private route for chat page */}
        <Route path="/chat" element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }/>

        {/* Private route for profile page */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }/>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;

