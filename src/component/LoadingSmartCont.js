
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

import abi from "D:/SupplyChain/client/src/contract/FishingRegistry.json"
import { ethers } from 'ethers';


export const LoadingSmartCont = () => {
    const temp = (e) => {
        e.preventDefault();
        
    
        
    };
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
      // console.log(state);
      console.log(state.contract);
      // console.log(abi.abi)
      // console.log(state.provider);
  return (
    // <div>LoadingSmartCont</div>
    <></>
  )
}
