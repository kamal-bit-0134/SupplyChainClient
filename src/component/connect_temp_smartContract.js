import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import SupplyChain from './contracts/SupplyChain.json';

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [date, setDate] = useState('');
  const [stateInfo, setStateInfo] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const init = async () => {
      // Connect to MetaMask or other web3 provider
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChain.networks[networkId];
        if (networkData) {
          const contract = new web3.eth.Contract(SupplyChain.abi, networkData.address);
          setContract(contract);
        } else {
          window.alert('SupplyChain contract not deployed to detected network.');
        }
      } else {
        window.alert('Please install MetaMask to use this dApp.');
      }
    };
    init();
  }, []);

  const handleAddItem = async () => {
    await contract.methods.newItem(productName, date).send({ from: account });
    setOutput('Item added successfully.');
  };

  const handleAddState = async () => {
    await contract.methods.addState(productId, stateInfo).send({ from: account });
    setOutput('State added successfully.');
  };

  const handleSearchProduct = async () => {
    const result = await contract.methods.searchProduct(productId).call();
    setOutput(result);
  };

  return (
    <div>
      <h1>Supply Chain dApp</h1>
      <p>Account: {account}</p>
      <label htmlFor="productName">Product Name:</label>
      <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
      <label htmlFor="date">Date:</label>
      <input type="text" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleAddItem}>Add Item</button>
      <br />
      <label htmlFor="productId">Product ID:</label>
      <input type="text" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <label htmlFor="stateInfo">State Info:</label>
      <input type="text" id="stateInfo" value={stateInfo} onChange={(e) => setStateInfo(e.target.value)} />
      <button onClick={handleAddState}>Add State</button>
      <br />
      <label htmlFor="productIdSearch">Product ID:</label>
      <input type="text" id="productIdSearch" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <button onClick={handleSearchProduct}>Search Product</button>
      <br />
      <label htmlFor="output">Output:</label>
      <div id="output">{output}</div>
    </div>
  );
}

export default App;