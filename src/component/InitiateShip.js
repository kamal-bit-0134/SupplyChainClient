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


export const InitiateShip = () => {

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


    const initiateShipmentCall = async (event)=>{
        event.preventDefault();
        const shipmentId = document.getElementById('shipmentId').value;
        
        const processor = document.getElementById('processor').value;
        const distributor = document.getElementById('distributor').value;
        const recipient = document.getElementById('recipient').value;
        const batchId = document.getElementById('batchId').value;

        // await initiateShipment(1, "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", 1);
        // getShipmentByBatchId(1);
        // const location = await getLocationAsync();
        // console.log(location);
        // const locationString = `lat:${location.lat}, long:${location.long}`;

        // console.log(locationString);
        // await updateShipmentLocation(2,2,locationString);
        // getShipmentByBatchId(1);
        await initiateShipment(shipmentId,processor,distributor,recipient,batchId);
        // getShipmentByBatchId(4);

        // console.log(shipmentId)
        // console.log(processor)
        // console.log(distributor)
        // console.log(recipient)
        // console.log(batchId)

        
    }
    //last entry (3,add,add,add,3)

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

    const initiateShipment = async (shipmentId, processor, distributor, recipient, batchId) => {
        try {
          const { contract } = state; // assuming the contract instance is stored in a state variable
      
          // sample input values
          // const shipmentId = 1;
          // const processor = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
          // const distributor = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
          // const recipient = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
          // const batchId = 1;
      
          // call the contract method
          await contract.initiateShipment(shipmentId, processor, distributor, recipient, batchId);
      
          console.log("Shipment initiated successfully!");
        } catch (error) {
          console.error(error);
        }
      };

      async function getShipmentByBatchId(batchId) {
        try {
          const { contract } = state;
          const result = await contract.getShipmentLocations(batchId);
          console.log(result);
          return result;
        } catch (error) {
          console.log(error);
        }
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
      

  return (
    <>
    <Header title="Supply Chain" searchBar={false}/>

    <form className="myForm">  
  <div className='formRow' id="heading">
    <h1 className="form-heading">Initiate Shipment</h1>
  </div>
  <div className="formRow">
    <div className="formGroup">
      <label htmlFor="shipmentId">Shipment ID:</label>
      <br></br>
      <input type="number" id="shipmentId" name="shipmentId" />
    </div>
    <div className="formGroup">
      <label htmlFor="processor">Processor Address:</label>
      <input type="text" id="processor" name="processor" />
    </div>
    <div className="formGroup">
      <label htmlFor="distributor">Distributor Address:</label>
      <input type="text" id="distributor" name="distributor" />
    </div>
    <div className="formGroup">
      <label htmlFor="recipient">Recipient Address:</label>
      <input type="text" id="recipient" name="recipient" />
    </div>
    <div className="formGroup">
      <label htmlFor="batchId">Batch ID:</label>
      <br></br>

      <input type="number" id="batchId" name="batchId" />
    </div>
  </div>
  <div className="formRow">
    <button type="submit" className="btn" onClick={initiateShipmentCall}>Initiate Shipment</button>
  </div>
</form>


    </>
    
  )
}
