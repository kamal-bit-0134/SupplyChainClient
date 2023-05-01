/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Big from 'big.js';

import Header from './Header'
import { LoadingSmartCont } from './LoadingSmartCont';


import abi from "D:/SupplyChain/client/src/contract/ProductContract.json"
import { ethers } from 'ethers';
import './style5.css'

import QRCode from 'qrcode.react';


export const Packaging = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // the user is not logged in, redirect them to the login page
      navigate("/login");
    }
  }, [navigate]);


  // const productID = 'ABC123';
  // const batchID = '456DEF';
  // const obj = { 
  //   productID: productID,
  //   batchID: batchID
  // };

  const [productBatchJson, setProductBatchJson] = useState("");
  const [qrcode, showQR] = useState(false);



  const addProductClick = async (event) => {
    // Call the initiateShipment function here
    event.preventDefault();

    const productID = document.getElementById('productID').value;
    const temperature = document.getElementById('temperature').value;
    const qualityAssurance = document.getElementById('qualityAssurance').value;
    const packagingMaterial = document.getElementById('packagingMaterial').value;
    const fssaiCode = document.getElementById('fssaiCode').value;
    const batchID = document.getElementById('batchID').value;
    const handlingInstructions = document.getElementById('handlingInstructions').value;

    await addProduct(productID, temperature, qualityAssurance, packagingMaterial, fssaiCode, batchID, handlingInstructions);
    // last run was as below
    // addProduct(
      // 4
    //   
    // );
    
    // await getProductDetails(1);
    const productBatchObj = { productId: productID, batchId: batchID };
    const productBatchJson = JSON.stringify(productBatchObj);
    setProductBatchJson(productBatchJson);
    console.log(productBatchJson)
    showQR(true);
    



    

    
  };

    const [state, setState] = useState({
        provider: null,
        signer: null,
        contract: null,
      });
      const [account, setAccount] = useState("None");
      useEffect(() => {
        const connectWallet = async () => {
          const contractAddress = "0x3a6911aDBDbf1Db3c61763213D3181580f6Ba836";
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


    async function addProduct(productID, temperature, qualityAssurance, packagingMaterial, fssaiCode, batchID, handlingInstructions) {
      try {
        const { contract } = state;
        const result = await contract.addProduct(
          productID,
          temperature,
          qualityAssurance,
          packagingMaterial,
          fssaiCode,
          batchID,
          handlingInstructions
        );
    
        console.log(result);
        return result;
      } catch (error) {
        console.error(error);
      }
    }

    async function getProductDetails(productID) {
      try {
        const { contract } = state;
        const result = await contract.getProductDetails(productID);
    
        const temperature = result.temperature;
        const qualityAssurance = result.qualityAssurance;
        const packagingMaterial = result.packagingMaterial;
        const fssaiCode = result.fssaiCode;
        const batchID = result.batchID;
        const handlingInstructions = result.handlingInstructions;
        const verified = result.verified;
    
        console.log("Temperature:", temperature);
        console.log("Quality Assurance:", qualityAssurance);
        console.log("Packaging Material:", packagingMaterial);
        console.log("FSSAI Code:", fssaiCode);
        console.log("Batch ID:", batchID);
        console.log("Handling Instructions:", handlingInstructions);
        console.log("Verified:", verified);
    
        return result;
      } catch (error) {
        console.error(error);
      }
    }
    
    

  return (
    <>
    <Header title="Supply Chain" searchBar={false}/>
    <h1 style={{textAlign:'center'}}> Packaging  Node</h1>

    <form className="myForm" style={{marginTop:'2px',    marginBottom: '8px'}}>
      <label htmlFor="productID">Product ID:</label>
      <input type="number" id="productID" name="productID" required />

      <label htmlFor="temperature">Temperature:</label>
      <input type="text" id="temperature" name="temperature" required />

      <label htmlFor="qualityAssurance">Quality Assurance:</label>
      <input type="text" id="qualityAssurance" name="qualityAssurance" required />

      <label htmlFor="packagingMaterial">Packaging Material:</label>
      <input type="text" id="packagingMaterial" name="packagingMaterial" required />

      <label htmlFor="fssaiCode">FSSAI Code:</label>
      <input type="text" id="fssaiCode" name="fssaiCode" required />

      <label htmlFor="batchID">Batch ID:</label>
      <input type="text" id="batchID" name="batchID" required />

      <label htmlFor="handlingInstructions">Handling Instructions:</label>
      <textarea id="handlingInstructions" name="handlingInstructions" required />

      <button type="submit" onClick={addProductClick}>Add Product</button>

    </form>

    {qrcode?

    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center",marginBottom:'8px' }}>
    <h1>QR code for the product</h1>
    <QRCode value={productBatchJson} />
    </div>

    : ""
    }

    </>

    
  )
}
