import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";


const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userData = useSelector((store) => store.user);

  // Fetch logged-in user
  const fetchUser = async () => {

    try {

      const res = await axios.get(
        BaseURL + "/profile/view",
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));

    } catch (err) {

      const status = err.response?.status;

      if (status === 401) {
        navigate("/login");
      }

      console.error(err);
    }
  };

  // Fetch user when app loads
  useEffect(() => {

    if (!userData) {
      fetchUser();
    }

  }, []);


  // Check whether profile is completed
  useEffect(() => {

    if (!userData) {
      return;
    }

    // Don't redirect the user while they are on these pages
    if (
      location.pathname === "/login" ||
      location.pathname === "/profile/setup"
    ) {
      return;
    }

    // If profile is incomplete, force user to profile setup
    if (userData.profileCompleted === false) {

      navigate("/profile/setup");

    }

  }, [userData, location.pathname]);


return (
  <div className="min-h-screen flex flex-col">
    <NavBar />

    <main className="flex-1">
      <Outlet />
    </main>

    <Footer />
  </div>
);
};

export default Body;