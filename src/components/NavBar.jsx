import { useSelector , useDispatch } from "react-redux"
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";


const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const handleLogout = async () => {

    try{
       await axios.post(BaseURL + "/logout", {}, {
        withCredentials: true,
      });
      dispatch(removeUser()); // Remove user data from Redux store after logout
      return <Navigate to="/login" />;


    }
    catch(err){
      console.error(err);
    }
  }


  return (
    <>
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {user && (
      <div className="dropdown dropdown-end mx-5 flex" >
        <p className='px-4'>Welcome, {user.firstName}!</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
           src={user.photoUrl} />
        </div> 
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connections</Link></li>
        <li><Link to="/requests">Requests</Link></li>
        <li><Link to="/premium">Premium</Link></li>
        <li><Link to="/login" onClick={handleLogout}>
          Logout
        </Link></li>
      </ul>
    </div>
    )}
  </div>
</div>
    </>
  )
}

export default NavBar
