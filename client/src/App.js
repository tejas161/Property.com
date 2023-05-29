import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Error from './pages/Error'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MyProfile from './pages/MyProfile';
import Logout from './pages/Logout';
import AllProperties from './pages/AllProperties';
import ListProperty from './pages/ListProperty';
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import PropertyDetails from './pages/PropertyDetails';
import RequestPage from './pages/RequestPage';
import Saved from './pages/Saved';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';

const App = () => {
  return (
    <>
 
    
      <Navbar/>
      <div className="container">

        <Routes>

          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/aboutus" element={<AboutUs />}></Route>
         <Route path="/login" element={<LoginPage />}></Route>
         <Route path="/signup" element={<SignUpPage />}></Route>
         <Route path="/myprofile" element={<MyProfile/>}></Route>
         <Route path="/saved" element={<Saved/>}></Route>
         <Route path="/logout" element={<Logout/>}></Route>
         <Route path="/allproperties" element={<AllProperties/>}></Route>
         <Route path="/listproperty" element={<ListProperty/>}></Route>
         <Route path="/propertydetails/:id" element={<PropertyDetails/>}></Route>
         <Route path="/requestpage" element={<RequestPage/>}></Route>
         <Route path="/resetpassword" element={<ResetPassword/>}></Route>
         <Route path="/changepassword" element={<ChangePassword/>}></Route>
         


          <Route path="*" element={<Error />}></Route>




        </Routes>
        </div>
        <Footer/>



     






    </>
  )
}

export default App;
