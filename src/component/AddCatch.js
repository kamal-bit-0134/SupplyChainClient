/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Big from 'big.js';

import './styles2.css'
import Header from './Header'
import { LoadingSmartCont } from './LoadingSmartCont';


import abi from "D:/SupplyChain/client/src/contract/FishingRegistry.json"
import { ethers } from 'ethers';
import './style3.css'


export const AddCatch = () => {

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

      async function formatDateAsync(timestamp) {
        const dateObj = new Date(timestamp);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const seconds = String(dateObj.getSeconds()).padStart(2, "0");
        const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
      }

      async function printVal(event) {
        event.preventDefault();
        try {
          const location = await getLocationAsync();
          console.log(location);
          const locationString = `lat:${location.lat}, long:${location.long}`;

          console.log(locationString);


          const timestamp = new Date().getTime();
          const formattedDate = await formatDateAsync(timestamp);

          const fishermanName = document.getElementById("fishermanName").value;
          const fishermanID = document.getElementById("fishermanID").value;
          const licenseNumber = document.getElementById("licenseNumber").value;
          const species = document.getElementById("species").value;
          const quantity = document.getElementById("quantity").value;
          const quantityUint = parseInt(quantity, 10);
          const fishingMethod = document.getElementById("fishingMethod").value;
          const batchId = document.getElementById("batchId").value;
          const batchIdUint = parseInt(batchId, 10);

          console.log(fishermanName, fishermanID, licenseNumber, species, quantity, fishingMethod, batchId, timestamp, location,formattedDate);
          console.log(typeof batchIdUint)
          console.log( batchIdUint)


        // Registering the catch
        registerCatch(fishermanName,fishermanID, licenseNumber,species, quantityUint,fishingMethod, batchIdUint, locationString, timestamp );
        //4
        

    } catch (error) {
          console.error(error);
        }
      }
      
      

    async function temp(event){
        event.preventDefault();
        try {
            const nu = 4 ;
            // const nUint = parseInt(nu, 10); // the second argument is the radix (base) of the number
            console.log(typeof nUint)
            const catchData = await getCatchByBatchId(nu);
            console.log(typeof catchData);
            catchData.forEach(element => {
                // console.log(typeof element)
                if(typeof element == 'object'){
                    const bigNumber = new Big(element);
                    // const result = bigNumber.times(2);
                    console.log(bigNumber.toString());
                }
                else{
                console.log(element)

                }
            });
        } catch (error) {
            console.log('error')
        }
    }

    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
      });
      const [account, setAccount] = useState("None");
      useEffect(() => {
        const connectWallet = async () => {
          const contractAddress = "0x336E9f46606BBa9810a1d33364299d25f2C6B030";
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

    async function getCatchByBatchId(batchId) {
        try {
          const { contract } = state;
          const result = await contract.getCatchByBatchId(batchId);
          console.log(result);
          return result;
        } catch (error) {
          console.log(error);
        }
    }

    const registerCatch = async (fishermanName,fishermanID, licenseNumber,species, quantity,fishingMethod, batchId, location, timestamp ) => {
        try {
          const { contract } = state;
        //   const fishermanName = "John Doe";
        //   const fishermanID = "12345";
        //   const licenseNumber = "ABC123";
        //   const species = "Trout";
        //   const location = "Lake Tahoe";
        //   const timestamp = 1649126400;
        //   const quantity = 5;
        //   const fishingMethod = "Fly fishing";
        //   const batchId = 1;
      
          await contract.registerCatch(
            fishermanName,
            fishermanID,
            licenseNumber,
            species,
            location,
            timestamp,
            quantity,
            fishingMethod,
            batchId
          );
      
          console.log("Catch registered successfully!");
        } catch (error) {
          console.error(error);
        }
      };

      

      


  return (

    <>
    <Header title="Supply Chain" searchBar={false}/>

    {/* <button  type="submit" onClick={temp}>
            temp
    </button> */}

<form className="myForm">  
        <div className='formRow' id="heading">
      <h1 class="form-heading">Add Catching details</h1>

        </div>
      <div className="formRow">
        <div className="formGroup" style={{marginLeft: '34px'}}>
          <label htmlFor="fishermanName">Fisherman Name:</label>
          <input type="text" id="fishermanName" name="fishermanName" />
        </div>
        <div className="formGroup"style={{marginLeft: '34px'}}>
          <label htmlFor="fishermanID">Fisherman ID:</label>
          <br></br>
          <input type="text" id="fishermanID" name="fishermanID" />
        </div>
        <div className="formGroup"style={{marginLeft: '34px'}}>
          <label htmlFor="licenseNumber">License Number:</label>
          <input type="text" id="licenseNumber" name="licenseNumber" />
        </div>
        <div className="formGroup"style={{marginLeft: '34px'}}>
          <label htmlFor="species">Species:</label>
          <br></br>

          <input type="text" id="species" name="species" />
        </div>
        {/* <div className="formGroup">
          <label htmlFor="location" className="hiddenLabel">Location:</label>
          <input type="hidden" id="location" name="location" />
        </div>
        <div className="formGroup">
          <label htmlFor="timestamp" className="hiddenLabel">Timestamp:</label>
          <input type="hidden" id="timestamp" name="timestamp" />
        </div> */}
      </div>
      <div className="formRow"style={{marginLeft: '34px'}}>
        <div className="formGroup"style={{marginLeft: '34px'}}>
          <label htmlFor="quantity">Quantity:</label>
          <br></br>

          <input type="number" id="quantity" name="quantity" />
        </div>
        <div className="formGroup"style={{marginLeft: '34px'}}>
          <label htmlFor="fishingMethod">Fishing Method:</label>
          <input type="text" id="fishingMethod" name="fishingMethod" />
        </div>
        <div className="formGroup"style={{marginLeft: '34px'}}>
          <label htmlFor="batchId">Batch ID:</label>
          <br></br>

          <input type="text" id="batchId" name="batchId" />
        </div>
      </div>
      <div className="formRow">
        <button type="submit" className="btn" onClick={printVal} >Submit</button>
      </div>
    </form>


    


    </>

  )
}
