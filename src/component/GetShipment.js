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



export const GetShipment = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // the user is not logged in, redirect them to the login page
      navigate("/login");
    }
  }, [navigate]);

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


  const getShipLoc = async (event)=>{
    event.preventDefault();
    const batchId = document.getElementById('batchId').value;
    getShipmentByBatchId(batchId);


    
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
    <h1 className="form-heading">Get Shipment Location</h1>
  </div>
  <div className="formRow" style={{justifyContent: 'center'}}>
    {/*  */}
    
    <div className="formGroup">
      <label htmlFor="batchId">Batch ID:</label>
      <br></br>

      <input type="number" id="batchId" name="batchId" />
    </div>
  </div>
  <div className="formRow">
    <button type="submit" className="btn" onClick={getShipLoc}>Get Shipment Details</button>
  </div>
</form>

    </>
  )
}
