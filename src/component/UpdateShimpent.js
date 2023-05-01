/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Big from 'big.js';

import './styles2.css'
import Header from './Header'
import { LoadingSmartCont } from './LoadingSmartCont';


import abi from "D:/SupplyChain/client/src/contract/SeafoodSupplyChain.json"
import { ethers } from 'ethers';
import './style3.css'


export const UpdateShimpent = () => {

  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // the user is not logged in, redirect them to the login page
      navigate("/login");
    }
  }, [navigate]);

  async function getLocationAsync() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            // console.log(`Latitude: ${lat}, Longitude: ${long}`);
            // do something with the coordinates
            resolve({lat, long});
          },
          (error) => {
            console.error(error);
            reject(error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  const updateShipmentLocation = async (shipmentId, batchId, location) => {
    try {
      const { contract } = state; // assuming state contains the contract instance
      
      await contract.updateShipmentLocation(shipmentId, batchId, location);
      
      console.log("Shipment location updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const updateShipLoc = async (event)=>{
    event.preventDefault();
    const shipmentId = document.getElementById('shipmentId').value;
    const batchId = document.getElementById('batchId').value;

    const location = await getLocationAsync();
    console.log(location);
    const locationString = `lat:${location.lat}, long:${location.long}`;

    console.log(locationString);
    await updateShipmentLocation(shipmentId,shipmentId,locationString);
  }

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xDddE333CB543F83aeeDe857461a6dBEF1c29dFCF";
      const contractABI = abi.abi;
      console.log(contractABI)
      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
  
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
  
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
  
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
          
       
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
}, []);

console.log('first')
console.log(state);
console.log(state.contract);
console.log(abi.abi)
console.log(state.provider);

  return (
    <>
    <Header title="Supply Chain" searchBar={false}/>

    <form className="myForm">  
  <div className='formRow' id="heading">
    <h1 className="form-heading">Update Shipment Location</h1>
  </div>
  <div className="formRow" style={{justifyContent: 'center'}}>
    <div className="formGroup">
      <label htmlFor="shipmentId">Shipment ID:</label>
      <br></br>
      <input type="number" id="shipmentId" name="shipmentId" />
    </div>
    
    <div className="formGroup">
      <label htmlFor="batchId">Batch ID:</label>
      <br></br>

      <input type="number" id="batchId" name="batchId" />
    </div>
  </div>
  <div className="formRow">
    <button type="submit" className="btn" onClick={updateShipLoc}>Update Shipment</button>
  </div>
</form>

    </>
  )
}
