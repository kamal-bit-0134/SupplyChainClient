/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';

import Big from 'big.js';

import Header from './Header'
import { LoadingSmartCont } from './LoadingSmartCont';


import abi from "D:/SupplyChain/client/src/contract/SeafoodSupplyChain.json"
import { ethers } from 'ethers';
import './styles2.css'

export const Distribution = () => {

  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // the user is not logged in, redirect them to the login page
      navigate("/login");
    }
  }, [navigate]);


    const temp = (event)=>{
      event.preventDefault();
    }

    const handleiniNav = () => {
      // setIsLoggedIn(true);
      navigate('/inishipment');
    };

    const handleInitiateShipmentClick = (e) => {
        e.preventDefault();
        handleiniNav();
    
        
    };

    const handleUpdateNav = () => {
      // setIsLoggedIn(true);
      navigate('/updateshipment');
    };

    const handleUpdateShipmentClick = (e) => {
        e.preventDefault();
        handleUpdateNav();
    
        
    };

    const handleGetNav = () => {
      // setIsLoggedIn(true);
      navigate('/getshipment');
    };

    const handleGetShipmentClick = (e) => {
        e.preventDefault();
        handleGetNav();
    
        
    };


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
    <div className='loginForm'>
  <form>
    <h2>Welcome Distributor</h2>
    <br></br>

    <div className='btnContainer'>
      <button className='btn' type="submit" onClick={handleInitiateShipmentClick}>
        Initiate Shipment
      </button>
      <br></br>
      <button className='btn' type="submit" onClick={handleUpdateShipmentClick}>
        Update Shipment
      </button>
      <br></br>

      <button className='btn' type="submit" onClick={handleGetShipmentClick}>
        Get Shipment
      </button>

      {/* <br></br>

      <button className='btn' type="submit" onClick={temp}>
        Packaging
      </button> */}
    </div>

    {/* {state.contractAddress} */}
  </form>
</div>

    </>
  )
}
