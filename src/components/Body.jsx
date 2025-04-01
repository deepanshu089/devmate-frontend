import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants.js'
import { addUser } from '../utils/userSlice.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' 
import { useSelector } from 'react-redux'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user= useSelector((store)=>store.user);
   //when we are refreshing the page the redux store data erases and navbar is not showing the user
   // so we need to fetch the user data from the server as the token in still there
   //in the browser cookies it will respond to the /profile api call to send the profile data
  const fetchUser = async() => {
    try{
      if(user){return;}//if user is already in the redux store then we will not fetch 
      // the user data from the server
      const response = await axios.get(BASE_URL+'/profile/view',{withCredentials:true});
    dispatch(addUser(response.data));
  }
    catch(error){
      console.log(error);
      if(error.response.status===401){ //if error is 401 then the user is not logged in means we will redirect to the login page
        navigate('/login'); // if we get error then we need to navigate to the login 
                          // page as the user is not logged in thats why the token 
                          // is not working and api call failed to view the profile
      }
    }
  }

  //once the page is loaded the user data is fetched from the
  //  server and added to the redux store
  useEffect(()=>{
    
      fetchUser();
    
  },[]);


  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body
