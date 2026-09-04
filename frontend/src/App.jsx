import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { authUserQueryFn } from "./utils/db/queries.js";

import LoginPage from "./pages/auth/login/LoginPage.jsx";
import SignupPage from "./pages/auth/signup/SignupPage.jsx";
import HomePage from "./pages/home/homePage.jsx";
import HomeFeed from "./pages/home/HomeFeed.jsx";
import SelectedPost from "./pages/home/Posts/SelectedPost.jsx";
import NotificationPage from "./pages/home/Notifications/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {

  const { data: authUser, isLoading } = useQuery( {
    queryKey: [ "authUser" ],
    queryFn: authUserQueryFn,
    retry: false,    
  } );

  if( isLoading ){
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (  
    <div className="flex max-w-360 mx-auto">
      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login" />}>
          <Route index element={ <HomeFeed /> }/>
          <Route path="post/:postId" element={ <SelectedPost /> }/>
          <Route path="notifications" element={ <NotificationPage /> } />
          <Route path="profile/:username" element={ <ProfilePage /> } />
        </Route>
        
        <Route path="signup" element={ authUser ? <Navigate to="/" /> : <SignupPage /> }/>
        <Route path="login" element={ authUser ? <Navigate to="/" /> : <LoginPage/> }/>
      </Routes>
      <Toaster />
    </div>
   )
}

export default App;
