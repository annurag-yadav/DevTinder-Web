import {BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import ResetPassword from "./components/ResetPassword";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileSetup from "./components/ProfileSetup";
import PublicProfile from "./components/PublicProfile";
import SearchResults from "./components/SearchResults";
import { Provider } from "react-redux";
import appstore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
    <Provider store={appstore}> 
    <BrowserRouter basename="/">
    {/* use store to provide the state to the entire app */}
   
    <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
              <Route path="/profile/:userId" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
              <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><Requests /></ProtectedRoute>} />
              <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
              <Route path="/chat/:targetUserId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            </Route>

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

</Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;