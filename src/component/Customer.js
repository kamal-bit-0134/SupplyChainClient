/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import jsQR from "jsqr";


import './style.css'
import Header from './Header'


export const Customer = () => {

  const [qrCodeContent, setQrCodeContent] = useState("");
  const [isQrCodeSet, setIsQrCodeSet] = useState(false);


  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const img = document.createElement("img");
        img.src = e.target.result;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        img.onload = function () {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
          setQrCodeContent(qrCode.data);
          setIsQrCodeSet(true);

        };
      } catch (err) {
        console.error(err);
      }
    };
   reader.readAsDataURL(file);


    
  };
  useEffect(() => {
    if (isQrCodeSet) {
      handleDetailNav();
    }
  }, [isQrCodeSet, qrCodeContent]);
  

  const navigate = useNavigate();
  const handleDetailNav = () => {
    // setIsLoggedIn(true);
    if (!qrCodeContent) {
      console.log('qr is empty')
      return; // do nothing if qrCodeContent is empty
    }
    navigate('/showdetail',{ state: { qrCodeContent: qrCodeContent } });
  };
  
  


    const [showAlert, setShowAlert] = useState(false); // new alert variable
  const [product_id, setProductID] = useState('');
  const [batch_id, setBatchID] = useState('');




    const handleProductIDChange = (event) => {
        setProductID(event.target.value);
    };
    const handleBatchIDChange = (event) => {
      setBatchID(event.target.value);
  };
    

    const handleSearchWithProductIDClick = (e) => {
        e.preventDefault();
        const inputElement = document.getElementById('batch_id');
        // Get the value of the input element
        const batchId = inputElement.value;
        const produtID = document.getElementById('product_id');
        // Get the value of the input element
        const productId = produtID.value;
        console.log(batchId,productId)
        const temp = {productId,batchId};
        const temptring = JSON.stringify(temp);

        navigate('/showdetail',{ state: { qrCodeContent: temptring } });



        // setShowAlert(false); // set showAlert to true
        // setShowAlert(true); // set showAlert to true
        // setShowOptions(false);
        // setShowProductIDForm(true);
    
        
      };
  return (
    <>
        <Header title="Supply Chain" searchBar={false}/>
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
          <h2>Search</h2>
          <div className='formGroup' style={{width: '100%'}}  >
            <label className='label' htmlFor="product_id" style={{width:'max-content'}}>
              Product ID
            </label>
            <input
              className='formControl'
              type="text"
              id="product_id"
              name="product_id"
              placeholder="Enter product ID"
              value={product_id}
              onChange={handleProductIDChange}
            />
          </div>
          <div className='formGroup' style={{width: '100%'}}  >
            <label className='label' htmlFor="batch_id" style={{width:'max-content'}}>
              Batch ID
            </label>
            <input
              className='formControl'
              type="text"
              id="batch_id"
              name="batch_id"
              placeholder="Enter Batch ID"
              value={batch_id}
              onChange={handleBatchIDChange}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className='btn' type="submit" onClick={handleSearchWithProductIDClick}>
              Search Product
            </button>
            {/* <button className='btn' type="submit" onClick={handleSearchWithProductIDClick}>
              Add QR Code
            </button>
            <input type="file" id="fileUp" onChange={handleFileUpload} accept=".png" /> */}
            <button className='btn' onClick={() => document.getElementById('fileUp').click()} type="button" style={{backgroundColor: '#0077cc', fontSize: '18px', fontWeight:'bold'}} id="fub">
  Add QR Code
</button>
<input type="file" id="fileUp" onChange={handleFileUpload} accept=".png" style={{display: "none"}} />

          </div>
          {/* {state.contractAddress} */}
          {qrCodeContent && <p>{qrCodeContent}</p>}

        </form>
        
        </div>


    </>

  )
}
