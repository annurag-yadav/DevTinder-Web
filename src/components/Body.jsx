import NavBar from './NavBar'
import { Outlet , useNavigate } from 'react-router-dom'
import axios from 'axios';
import {BaseURL} from '../utils/constants'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try{
      const res = await axios.get( BaseURL + "/profile/view",{
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
     fetchUser();
    }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default Body
