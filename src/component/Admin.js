/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';


import './styles2.css'
import Header from './Header'
import { LoadingSmartCont } from './LoadingSmartCont';


import abi from "D:/SupplyChain/client/src/contract/FishingRegistry.json"
import { ethers } from 'ethers';



export const Admin = () => {

    
    const navigate = useNavigate();

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        // the user is not logged in, redirect them to the login page
        navigate("/login");
      }
    }, [navigate]);

    const handleAddCatchNav = () => {
        // setIsLoggedIn(true);
        navigate('/addcatch');
    };

    const handleDist = () => {
      // setIsLoggedIn(true);
      navigate('/dist');
    };
    
    const handlePack = () => {
      // setIsLoggedIn(true);
      navigate('/packaging');
    };

    const handleSearchWithProductIDClick = (e) => {
        e.preventDefault();
        // setShowAlert(false); // set showAlert to true
        // setShowAlert(true); // set showAlert to true
        // setShowOptions(false);
        // setShowProductIDForm(true);
    
        
    };

    const handleAddProductClick = (e) => {
        e.preventDefault();
        handleAddCatchNav();


        // setShowAlert(false); // set showAlert to true
    
        // setShowOptions(false);
    
        // setShowAddProductForm(true)
    
        
    };

    const handleTrackShipment = (e) => {
        e.preventDefault();
        // setShowAlert(false); // set showAlert to true
    
        // setShowOptions(false);
    
        // setShowTrackShipment(true);
        // const str = getLocation(e);
        // SetFreightHubLocationChange(str);
        // console.log(freightHubLocationChange);
        // console.log(str+"hehe");
        // getLocationAsync().then(coordinates => {
        //   const {lat, long} = coordinates;
        //   // temp = {lat, long};
        //   temp = `Latitude: ${lat}, Longitude: ${long}`
        //   setCoordinates(temp);
        //   getCatchByBatchId(1)
        //   // console.log(temp);
        //   // do something with the coordinates
        // }).catch(error => {
        //   console.error(error);
        // });
    
    
        
      };
  return (
    <>
        <Header title="Supply Chain" searchBar={false}/>
        {/* <LoadingSmartCont/> */}
        {/* <div className=' alertContainer'>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Logged in successfully!</strong> Thank you for choosing us.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <br></br>
        <br></br>

        </div>  */}

        <div className='loginForm'>
  <form>
    <h2>Welcome Admin</h2>

    <div className='btnContainer'>
      {/* <button className='btn' type="submit" onClick={handleSearchWithProductIDClick}>
        Search Product
      </button> */}
      <br></br>
      <button className='btn' type="submit" onClick={handleAddProductClick}>
        Add Catch
      </button>
      <br></br>

      <button className='btn' type="submit" onClick={handleDist}>
        Track Shipment
      </button>

      <br></br>

      <button className='btn' type="submit" onClick={handlePack}>
        Packaging
      </button>
    </div>

    {/* {state.contractAddress} */}
  </form>
</div>


    </>
  )
}
