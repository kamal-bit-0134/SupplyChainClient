/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';




import Header from './Header';
import cust from './cust';


// import abi from "D:/SupplyChain/client/src/contract/SupplyChain.json"
import abi from "D:/SupplyChain/client/src/contract/FishingRegistry.json"

// eslint-disable-next-line no-unused-vars
import { ethers } from 'ethers';
import Temp from './Temp';

export const Login = (props) => {
  const [isCustLoggedIn, setIsCustLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // const [role, setRole] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showAlert, setShowAlert] = useState(false); // new state variable
  const [showAlertAdmin, setShowAlertAdmin] = useState(false); // new state variable
  const [showOptions, setShowOptions] = useState(true); // new state variable
  
  const [showProductIDForm, setShowProductIDForm] = useState(false); // new state variable
  const [showAddProductForm, setShowAddProductForm] = useState(false); // new state variable
  
  const [showTrackShipment, setShowTrackShipment] = useState(false); // new state variable

  




  const [product_id, setProductID] = useState('');
  const [product_name, setProduct_name] = useState('');
  let temp = "";

  
  const [freightHubLocationChange, SetFreightHubLocationChange] = useState('');
  const [coordinates, setCoordinates] = useState(null);




  // const navigate  = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleProductIDChange = (event) => {
    setProductID(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProduct_name(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  
  const handleFreightHubLocationChange = (event) => {
    SetFreightHubLocationChange(event.target.value);
  };

  function getLocation(e) {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const str = `Latitude: ${lat}, Longitude: ${long}`;
          // console.log(`Latitude: ${lat}, Longitude: ${long}`);
          // do something with the coordinates
          return str;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

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

  // async function myFunction() {
  //   try {
  //     const {lat, long} = await getLocationAsync();
  //     // do something with the coordinates
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  const navigate = useNavigate();

  const handleCustNav = () => {
    // setIsLoggedIn(true);
    navigate('/customer');
  };
  const HandleCustomerLoginClick = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin') {
      console.log('Login successful!');
      setIsCustLoggedIn(true); // set isLoggedIn to true
      setIsLoggedIn(true); // set isLoggedIn to true
      setShowProductIDForm(true);
      handleCustNav();
      


      // navigate('/customer')
      // setContract('0x8777D80D242f72c223f6AD61C40F4d45D713A022')
      // setcontractAbi(abi.abi)



    } else {
      console.log('Invalid email or password');
      setShowAlert(true); // set showAlert to true

      
    }
  };
  const handleAdminNav = () => {
    // setIsLoggedIn(true);
    navigate('/admin');
  };
  
  const handleAdministratorLoginClick = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin') {
      console.log('Login successful!');
      setIsAdminLoggedIn(true); // set isLoggedIn to true
      setIsLoggedIn(true); // set isLoggedIn to true
      localStorage.setItem("isLoggedIn", true);
      handleAdminNav();
      // registerCatch();


      // navigate('/customer')
      // setContract('0x8777D80D242f72c223f6AD61C40F4d45D713A022')
      // setcontractAbi(abi.abi)



    } else {
      console.log('Invalid email or password');
      setShowAlertAdmin(true); // set showAlert to true

      
    }
  };
  
  const handleSearchWithProductIDClick = (e) => {
    e.preventDefault();
    setShowAlert(false); // set showAlert to true
    // setShowAlert(true); // set showAlert to true
    setShowOptions(false);
    setShowProductIDForm(true);

    
  };
  const handleAddProductClick = (e) => {
    e.preventDefault();
    setShowAlert(false); // set showAlert to true

    setShowOptions(false);

    setShowAddProductForm(true)

    
  };

  
  const handleUpdateShipmentClick = (e) => {
    e.preventDefault();
    getLocationAsync().then(coordinates => {
      const {lat, long} = coordinates;
      // temp = {lat, long};
      temp = `Latitude: ${lat}, Longitude: ${long}`
      setCoordinates(temp);
      // console.log(temp);
      // do something with the coordinates
    }).catch(error => {
      console.error(error);
    });
    console.log(coordinates+"e1");
    

    
  };
  
  const handleTrackShipment = (e) => {
    e.preventDefault();
    setShowAlert(false); // set showAlert to true

    setShowOptions(false);

    setShowTrackShipment(true);
    const str = getLocation(e);
    SetFreightHubLocationChange(str);
    console.log(freightHubLocationChange);
    console.log(str+"hehe");
    getLocationAsync().then(coordinates => {
      const {lat, long} = coordinates;
      // temp = {lat, long};
      temp = `Latitude: ${lat}, Longitude: ${long}`
      setCoordinates(temp);
      getCatchByBatchId(1)
      // console.log(temp);
      // do something with the coordinates
    }).catch(error => {
      console.error(error);
    });


    
  };
  


  // eslint-disable-next-line no-unused-vars
  const handleAlertClose = () => {
    setShowAlert(false);
  };

    const styles = {
  loginForm: {
    width: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '5px',
  },
  formControl: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  btn: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#008CBA',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  btnHover: {
    backgroundColor: '#0069d9',
  },
  alertContainer: {
    position: 'relative',
    top: '60px',
    margin: '0 auto',
    maxWidth: '800px',
  },
  
};

const styles2 = {
  loginForm: {
    width: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '5px',
  },
  formControl: {
    display: 'block',
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  btn: {
    display: 'inline-block',
    margin: '5px 0',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#008CBA',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  btnHover: {
    backgroundColor: '#0069d9',
  },
  alertContainer: {
    position: 'relative',
    top: '60px',
    margin: '0 auto',
    maxWidth: '800px',
  },
};



// Let's connect the smart contract here
// const [contract, setContract] = useState('');
// const [contractAbi, setcontractAbi] = useState('');
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


const registerCatch = async () => {
  try {
    const { contract } = state;
    const fishermanName = "John Doe";
    const fishermanID = "12345";
    const licenseNumber = "ABC123";
    const species = "Trout";
    const location = "Lake Tahoe";
    const timestamp = 1649126400;
    const quantity = 5;
    const fishingMethod = "Fly fishing";
    const batchId = 1;

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








  return (
    
    <div>
        <Header title="Supply Chain" searchBar={false}/>
        {/* <Temp/> */}

        <h1>Welcome to Supply chain</h1>     
        {
             isLoggedIn===false? 
            <div style={styles.loginForm}>
      <form>
      <h2>Login</h2>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          style={styles.formControl}
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="password">
          Password
        </label>
        <input
          style={styles.formControl}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <button style={styles.btn} type="submit" onClick={handleCustomerLoginClick}>
          Customer Login
        </button> */}
        
        <Link to="/customer" onClick={HandleCustomerLoginClick}>
        <button style={styles.btn} type="submit" >
          Customer Login
        </button>
      </Link>
        {/* <button style={styles.btn} type="submit" onClick={handleAdministratorLoginClick}>
          Administrator Login
        </button> */}
        <Link to="/admin" onClick={handleAdministratorLoginClick}>
        <button style={styles.btn} type="submit" >
          Administrator Login
        </button>
      </Link>
      </div>
    </form>
    </div>

             :
             ""
         }

      
        {
          (isCustLoggedIn || isAdminLoggedIn)&& showProductIDForm?
          <div style={styles.loginForm}>
          <form>
          <h2>Search</h2>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="product_id">
              Product ID
            </label>
            <input
              style={styles.formControl}
              type="text"
              id="product_id"
              name="product_id"
              placeholder="Enter product ID"
              value={product_id}
              onChange={handleProductIDChange}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={styles.btn} type="submit" onClick={handleSearchWithProductIDClick}>
              Search Product
            </button>
            <button style={styles.btn} type="submit">
              Add QR Code
            </button>
          </div>
          {/* {state.contractAddress} */}
        </form>
        
        </div>
          // <div>
        
              /* <h1>Hey welcome to customer page</h1> */
          /* </div> */
          :""
        }
        {showAlert?
        <div style={styles.alertContainer}>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Invalid email or password!</strong> You should check in on some of those fields.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </div> 
        :""}
        {isCustLoggedIn?
        <div style={styles.alertContainer}>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Logged in successfully!</strong> Thank you for choosing us.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </div> 
        :""}

      {/* Admin index page */}

      {isAdminLoggedIn && showOptions?
      <div style={styles2.loginForm}>
      <form>
        <h2>Manufacturer</h2>
        
        <div style={styles2.btnContainer}>
          <button style={styles2.btn} type="submit" onClick={handleSearchWithProductIDClick}>
            Search Product
          </button>
          <button style={styles2.btn} type="submit" onClick={handleAddProductClick}>
            Add Product
          </button>
          <button style={styles2.btn} type="submit" onClick={handleTrackShipment}>
            Track Shipment
          </button>
        </div>
        
        {/* {state.contractAddress} */}
      </form>
    </div>
    :
    ""
      }

      {showAlertAdmin?
        <div style={styles.alertContainer}>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Invalid email or password!</strong> You should check in on some of those fields.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </div> 
        :""}
        {isAdminLoggedIn?
        <div style={styles.alertContainer}>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Logged in successfully!</strong> Hello Admin.
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </div> 
        :""}


        {/* Admin->addProduct */}
        {
          isAdminLoggedIn&& showAddProductForm?
          <div style={styles2.loginForm}>
          <form>
          <h2>Add Product</h2>
          <div style={styles2.formGroup}>
            <label style={styles2.label} htmlFor="product_name">
              Product Name
            </label>
            <input
              style={styles2.formControl}
              type="text"
              id="product_name"
              name="product_name"
              placeholder="Enter product name"
              value={product_name}
              onChange={handleProductNameChange}
            />
          </div>
          
          <div style={styles2.btnContainer}>
            <button style={styles2.btn} type="submit" onClick={handleSearchWithProductIDClick}>
              Add Product
            </button>
            {/* <button style={styles.btn} type="submit">
              Add QR Code
            </button> */}
          </div>
          {/* {state.contractAddress} */}
        </form>
        
        </div>
          // <div>
        
              /* <h1>Hey welcome to customer page</h1> */
          /* </div> */
          :""
        }
        
        {/* Admin->Track Shipment */}
        {
          isAdminLoggedIn&& showTrackShipment?
          <div style={styles2.loginForm}>
          <form>
          <h2>Update Shipment</h2>
          <div style={styles2.formGroup}>
            <label style={styles2.label} htmlFor="product_id">
              Product ID 
            </label>
            <input
              style={styles2.formControl}
              type="text"
              id="product_id"
              name="product_id"
              placeholder="Enter product ID"
              value={product_id}
              onChange={handleProductIDChange}
            />
          </div>

          <div style={styles2.btnContainer}>
            <button style={styles2.btn} type="submit" onClick={handleSearchWithProductIDClick}>
              Scan QR
            </button>
          </div>

          <div style={styles2.formGroup}>
            <label style={styles2.label} htmlFor="freightHubLocationChange">
              Freight Hub Location
            </label>
            <input
              style={styles2.formControl}
              type="text"
              id="freightHubLocationChange"
              name="freightHubLocationChange"
              placeholder="Enter location or your location will be automatically fetched"
              value={freightHubLocationChange} //coordinates
              onChange={handleFreightHubLocationChange}
            />
          </div>
          
          <div style={styles2.btnContainer}>
            <button style={styles2.btn} type="submit" onClick={handleUpdateShipmentClick}>
              Update Shipment
            </button>
          </div>
          {/* {state.contractAddress} */}
          {/* <div style={styles2.btnContainer}>
            <button style={styles2.btn} type="submit" onClick={myFunction}>
              Temp
            </button>
          </div> */}
        </form>
        
        </div>
          // <div>
        
              /* <h1>Hey welcome to customer page</h1> */
          /* </div> */
          :""
        }

    </div>
  )
}
