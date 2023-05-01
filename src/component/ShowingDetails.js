/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Big from 'big.js';



import jsQR from "jsqr";
import { useLocation } from "react-router-dom";

// import abi from "D:/SupplyChain/client/src/contract/FishingRegistry.json"
import { ethers } from 'ethers';

import fishingRegistryAbi from "D:/SupplyChain/client/src/contract/FishingRegistry.json";
import distributionAbi from "D:/SupplyChain/client/src/contract/SeafoodSupplyChain.json"
import packagingAbi from "D:/SupplyChain/client/src/contract/ProductContract.json"






import './style.css'
import Header from './Header'



export const ShowingDetails = () => {
    const location = useLocation();
  const { qrCodeContent } = location.state;
  const { productId, batchId } = JSON.parse(qrCodeContent);
  
//   console.log(productId)
//   console.log(batchId)


const [catchinfo, setCatchinfo] = useState({
  fishermanID: '',
  fishermanName: '',
  fishingMethod: '',
  licenseNumber: '',
  location: '',
  quantity: '',
  species: '',
  datetemp: '',
  timetemp: '',
});

const [locationTrackData, setLocationTrackData] = useState([]);

const [packagingDetails, setPackagingDetails] = useState({
  temperature: '',
  qualityAssurance: '',
  packagingMaterial: '',
  fssaiCode: '',
  batchID: '',
  handlingInstructions: '',
  verified: true
});



const temp = (productId,batchId)=>{
    console.log(`Product id is ${productId} and BatchID is ${batchId}`)
}
temp(productId, batchId);

const [stateCatch, setStateCatch] = useState({
  provider: null,
  signer: null,
  contract: null,
});
const [account, setAccount] = useState("None");
useEffect(() => {
  const connectWallet = async () => {
    const contractAddress = "0x336E9f46606BBa9810a1d33364299d25f2C6B030";
    const contractABI = fishingRegistryAbi.abi;
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
        setStateCatch({ provider, signer, contract });
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
console.log(stateCatch);
console.log(stateCatch.contract);
console.log(fishingRegistryAbi.abi)
console.log(stateCatch.provider);

const [stateDist, setStateDist] = useState({
  provider: null,
  signer: null,
  contract: null,
});
// const [account, setAccount] = useState("None");
useEffect(() => {
  const connectWallet = async () => {
    const contractAddress = "0xDddE333CB543F83aeeDe857461a6dBEF1c29dFCF";
    const contractABI = distributionAbi.abi;
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
        setStateDist({ provider, signer, contract });
      } else {
        alert("Please install metamask");
      }
        
     
    } catch (error) {
      console.log(error);
    }
  };
  connectWallet();
}, []);

console.log('Distribution')
console.log(stateDist);
console.log(stateDist.contract);
console.log(distributionAbi.abi)
console.log(stateDist.provider);

// Packagin smart contract connection
const [statePack, setStatePack] = useState({
  provider: null,
  signer: null,
  contract: null,
});
useEffect(() => {
  const connectWallet = async () => {
    const contractAddress = "0x3a6911aDBDbf1Db3c61763213D3181580f6Ba836";
    const contractABI = packagingAbi.abi;
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
        setStatePack({ provider, signer, contract });
      } else {
        alert("Please install metamask");
      }
        
     
    } catch (error) {
      console.log(error);
    }
  };
  connectWallet();
}, []);

console.log('Packaging')
console.log(statePack);
console.log(statePack.contract);
console.log(packagingAbi.abi)
console.log(statePack.provider);

// Getting catch details
async function getCatchByBatchId(batchId) {
  try {
    const { contract } = stateCatch;
    const result = await contract.getCatchByBatchId(batchId);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Getting shipment details
async function getShipmentByBatchId(batchId) {
  try {
    const { contract } = stateDist;
    const result = await contract.getShipmentLocations(batchId);
    console.log(result)
    // console.log(result[0][0]);
    // let temp = new Big(result[0][0])
    // console.log(temp.toString());
    // console.log(result[0][1]);
    // let temp = new Big(result[0][1])
    // console.log(temp.toString());
    // console.log(result[0][2]);
    // console.log(result[0][3]);
    // let temp = new Big(result[0][3])
    // console.log(temp.toString());
    // const utcTimestamp = 1681805424;
    // const istTimestamp = new Date(utcTimestamp );
    // const datetemp = istTimestamp.toLocaleDateString();
    // const timetemp = istTimestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    // console.log(datetemp)
    // console.log(timetemp)
    let sz = result.length
    console.log(`Size is ${sz}`)

    // console.log(result[sz-2][2])
    let locationTrackObj = []
    for(let i=sz;i>0;i--){
      
      let temp = new Big(result[sz-i][4])
      temp = temp.toString();
      console.log(temp)
      const utcTimestamp = parseInt(temp);
      const istTimestamp = new Date(utcTimestamp*1000 );
      const datetemp = istTimestamp.toLocaleDateString();
      const timetemp = istTimestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      
      // console.log(result[sz-i][2],datetemp,'t'+timetemp)
      // const str = result[sz-i][2];
      // const latv = parseFloat(result[sz-i][2].split('lat:')[1].split(',')[0]);
      // const longv = parseFloat(result[sz-i][2].split('long:')[1]);
      // console.log('Latitude:', latv);
      // console.log('Longitude:', longv);
      // locationTrackObj.push({date:datetemp,time:timetemp,loc:result[sz-i][2]});
      

    }
    console.log(locationTrackObj)

    
    
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Packaging Details
async function getProductDetails(productID) {
  try {
    const { contract } = statePack;
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

    const packagingDetails = {
      temperature: temperature,
      qualityAssurance: qualityAssurance,
      packagingMaterial: packagingMaterial,
      fssaiCode: fssaiCode,
      batchID: batchID,
      handlingInstructions: handlingInstructions,
      verified: verified
    };
    
    console.log(packagingDetails);
    

    return result;
  } catch (error) {
    console.error(error);
  }
}



console.log('Checking getcatch Checking getcatch Checking getcatch Checking getcatch Checking getcatch')
// getCatchByBatchId(2);

  async function printingCatchData(batchID){
    // event.preventDefault();
    try {
        const nu = batchID ;
        // const nUint = parseInt(nu, 10); // the second argument is the radix (base) of the number
        // console.log(typeof nUint)
        const catchData = await getCatchByBatchId(nu);
        // console.log(typeof catchData);
        // console.log(catchData)
        let {
          fishermanID,
          fishermanName,
          fishingMethod,
          licenseNumber,
          location,
          quantity,
          species,
          timestamp
        } = catchData;
        quantity = new Big(quantity);
        quantity = quantity.toString();
        timestamp = new Big(timestamp);
        timestamp = timestamp.toString();
  
        
  
        const utcTimestamp = 1681667474339;
        const istTimestamp = new Date(utcTimestamp );
        const datetemp = istTimestamp.toLocaleDateString();
        const timetemp = istTimestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        // console.log(`Date: ${datetemp}, Timedd: ${timetemp}`);
  
        
  
        // catchData.forEach(element => {
        //     // console.log(typeof element)
        //     if(typeof element == 'object'){
        //         const bigNumber = new Big(element);
        //         // const result = bigNumber.times(2);
        //         console.log(bigNumber.toString());
        //     }
        //     else{
        //     console.log(element)
  
        //     }
        // });
        // console.log(fishermanID,
        //   fishermanName,
        //   fishingMethod,
        //   licenseNumber,
        //   location,
        //   quantity,
        //   species,
        //   datetemp,timetemp)
        //   const udi = new Date().getTime();
        //   console.log("Timestaamp:",udi)
        setCatchinfo({
          fishermanID: fishermanID,
          fishermanName: fishermanName,
          fishingMethod: fishingMethod,
          licenseNumber: licenseNumber,
          location: location,
          quantity: quantity,
          species: species,
          datetemp: datetemp,
          timetemp: timetemp,
        })
        
        
    } catch (error) {
        console.log('error')
    }
  }
  

// printingCatchData(batchId);
useEffect(() => {
  const fetchData = async () => {
    const { contract } = stateCatch;
    const result = await contract.getCatchByBatchId(batchId);
    let {
      fishermanID,
      fishermanName,
      fishingMethod,
      licenseNumber,
      location,
      quantity,
      species,
      timestamp
    } = result;
    quantity = new Big(quantity);
    quantity = quantity.toString();
    timestamp = new Big(timestamp);
    timestamp = timestamp.toString();
  
    const utcTimestamp = 1681667474339;
    const istTimestamp = new Date(utcTimestamp);
    const datetemp = istTimestamp.toLocaleDateString();
    const timetemp = istTimestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  
    setCatchinfo({
      fishermanID: fishermanID,
      fishermanName: fishermanName,
      fishingMethod: fishingMethod,
      licenseNumber: licenseNumber,
      location: location,
      quantity: quantity,
      species: species,
      datetemp: datetemp,
      timetemp: timetemp,
    });
  };
  
  fetchData();
}, [batchId, stateCatch, setCatchinfo]);

console.log('Checking getShipment Checking getShipment Checking getShipment Checking getShipment')
getShipmentByBatchId(1);
useEffect(() => {
  const fetchData = async () => {
    const { contract } = statePack;
    const result = await contract.getProductDetails(productId);

    const newPackagingDetails = {
      temperature: result.temperature,
      qualityAssurance: result.qualityAssurance,
      packagingMaterial: result.packagingMaterial,
      fssaiCode: result.fssaiCode,
      batchID: result.batchID,
      handlingInstructions: result.handlingInstructions,
      verified: true
    };

    setPackagingDetails(newPackagingDetails);
  };

  fetchData();
}, [productId, statePack]);

useEffect(() => {
  const fetchData = async () => {
    const { contract } = stateDist;
    const result = await contract.getShipmentLocations(batchId);
    let sz = result.length;
    console.log(`Size is ${sz}`);

    let locationTrackObj = [];
    for(let i=sz;i>0;i--){
      let temp = new Big(result[sz-i][4])
      temp = temp.toString();
      // console.log(temp)
      const utcTimestamp = parseInt(temp);
      const istTimestamp = new Date(utcTimestamp*1000 );
      const datetemp = istTimestamp.toLocaleDateString();
      const timetemp = istTimestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      // console.log(result[sz-i][2],datetemp,'t'+timetemp)
      locationTrackObj.push({date:datetemp,time:timetemp,loc:result[sz-i][2]});
    }

    setLocationTrackData(locationTrackObj);
    // console.log(locationTrackData);
  }

  fetchData();
}, [stateDist, batchId]);


console.log('Checking getPackaging Checking getPackaging Checking getPackaging Checking getPackaging Checking getPackaging')
// getProductDetails(1);  //product ID

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    textAlign: "center",
    color: "#333",
  },
  subHeading: {
    fontWeight: "bold",
    marginRight: "5px",
  },
  data: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "10px",
  },
  smallData: {
    fontSize: "14px",
    lineHeight: "1.4",
    marginBottom: "5px",
  },
  
  distributionWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  distributionBox: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    width: "45%",
  },
};





  return (
    <>
      <Header title="Supply Chain" searchBar={false}/>
      

      
      {/* 
      <div>ShowingDetails</div>
      <p>qrCodeContent: Product ID:- {productId} BatchID:- {batchId} {qrCodeContent}</p>  */}
      {/* <h5>Catching</h5>
      <p>Fisherman ID: {catchinfo.fishermanID}</p>
      <p>Fisherman Name: {catchinfo.fishermanName}</p>
      <p>Fishing Method: {catchinfo.fishingMethod}</p>
      <p>License Number: {catchinfo.licenseNumber}</p>
      <p>Location: {catchinfo.location}</p>
      <p>Quantity: {catchinfo.quantity}</p>
      <p>Species: {catchinfo.species}</p>
      <p>Date: {catchinfo.datetemp}</p>
      <p>Time: {catchinfo.timetemp}</p>

      <h5>Distribution</h5>
      {locationTrackData.map((item, index) => (
        <div key={index}>
          <p>Date: {item.date}</p>
          <p>Time: {item.time}</p>
          <p>Location: {item.loc}</p>
        </div>
      ))}
      <h5>Packaging</h5>
      <p>Temperature: {packagingDetails.temperature}</p>
      <p>Quality Assurance: {packagingDetails.qualityAssurance}</p>
      <p>Packaging Material: {packagingDetails.packagingMaterial}</p>
      <p>FSSAI Code: {packagingDetails.fssaiCode}</p>
      <p>Batch ID: {packagingDetails.batchID}</p>
      <p>Handling Instructions: {packagingDetails.handlingInstructions}</p>
      <p>Verified: {packagingDetails.verified.toString()}</p> */}

<div style={styles.container}>
      <div style={styles.section}>
        <h3 style={styles.heading}>Catching</h3>
        <div style={styles.data}>
          <p>
            <span style={styles.subHeading}>Fisherman ID:</span>{" "}
            {catchinfo.fishermanID}
          </p>
          <p>
            <span style={styles.subHeading}>Fisherman Name:</span>{" "}
            {catchinfo.fishermanName}
          </p>
          <p>
            <span style={styles.subHeading}>Fishing Method:</span>{" "}
            {catchinfo.fishingMethod}
          </p>
          <p>
            <span style={styles.subHeading}>License Number:</span>{" "}
            {catchinfo.licenseNumber}
          </p>
          <p>
            <span style={styles.subHeading}>Location:</span>{" "}
            {catchinfo.location}
          </p>
          <p>
            <span style={styles.subHeading}>Quantity:</span>{" "}
            {catchinfo.quantity}
          </p>
          <p>
            <span style={styles.subHeading}>Species:</span> {catchinfo.species}
          </p>
          <p>
            <span style={styles.subHeading}>Date:</span> {catchinfo.datetemp}
          </p>
          <p>
            <span style={styles.subHeading}>Time:</span> {catchinfo.timetemp}
          </p>
        </div>
      </div>

      {/* <div style={styles.section}>
        <h3 style={styles.heading}>Distribution</h3>
        {locationTrackData.map((item, index) => (
          <div key={index} style={styles.data}>
            <p>
              <span style={styles.subHeading}>Date:</span> {item.date}
            </p>
            <p>
              <span style={styles.subHeading}>Time:</span> {item.time}
            </p>
            <p>
              <span style={styles.subHeading}>Location:</span> {item.loc}
            </p>
          </div>
        ))}
      </div> */}
        <div style={styles.section}>
  <h3 style={styles.heading}>Distribution</h3>
  <div style={styles.distributionWrapper}>
    {locationTrackData.map((item, index) => (
      <div key={index} style={styles.distributionBox}>
        <p>
          <span style={styles.subHeading}>Date:</span> {item.date}
        </p>
        <p>
          <span style={styles.subHeading}>Time:</span> {item.time}
        </p>
        <p>
          <span style={styles.subHeading}>Location:</span> {item.loc}
        </p>
      </div>
      
      
    ))}
  </div>
</div>




      <div style={styles.section}>
  <h3 style={styles.heading}>Packaging</h3>
  <div style={styles.data}>
    <p>
      <span style={styles.subHeading}>Temperature:</span>{" "}
      {packagingDetails.temperature}
    </p>
    <p>
      <span style={styles.subHeading}>Quality Assurance:</span>{" "}
      {packagingDetails.qualityAssurance}
    </p>
    <p>
      <span style={styles.subHeading}>Packaging Material:</span>{" "}
      {packagingDetails.packagingMaterial}
    </p>
    <p>
      <span style={styles.subHeading}>FSSAI Code:</span>{" "}
      {packagingDetails.fssaiCode}
    </p>
    <p>
      <span style={styles.subHeading}>Batch ID:</span>{" "}
      {packagingDetails.batchID}
    </p>
    <p>
      <span style={styles.subHeading}>Handling Instructions:</span>{" "}
      {packagingDetails.handlingInstructions}
    </p>
    <p>
      <span style={styles.subHeading}>Verified:</span>{" "}
      {packagingDetails.verified.toString()}
    </p>
  </div>
</div>

</div>

      
    </>

  )
}
