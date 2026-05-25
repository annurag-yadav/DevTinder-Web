import {BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appstore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
    <Provider store={appstore}> 
    <BrowserRouter basename="/">
    {/* use store to provide the state to the entire app */}
   
    <Routes>
      <Route path="/" element={<Body />} />
       <Route path="/" element={<Feed />} />
       <Route path="/login" element={<Login />} />
       <Route path="/profile" element={<Profile />} />
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;