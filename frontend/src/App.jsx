import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import SignupPage from "./pages/auth/signup/SignupPage.jsx";
import HomePage from "./pages/home/homePage.jsx";
import HomeFeed from "./pages/home/HomeFeed.jsx";
import SelectedPost from "./pages/home/Posts/SelectedPost.jsx";
import NotificationPage from "./pages/home/Notifications/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

function App() {

  return (  
    <div className="flex max-w-360 mx-auto">
      <Routes>
        <Route path="/" element={ <HomePage /> }>
          <Route index element={ <HomeFeed /> }/>
          <Route path="post/:postId" element={ <SelectedPost /> }/>
          <Route path="/notifications" element={ <NotificationPage /> } />
          <Route path="/profile/:username" element={ <ProfilePage /> } />
        </Route>
        
        <Route path="/signup" element={ <SignupPage /> }/>
        <Route path="/login" element={ <LoginPage /> }/>
      </Routes>
    </div>
   )
}

export default App;
