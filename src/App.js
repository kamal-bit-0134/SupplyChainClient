/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import  { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import Home from './component/Home';
import Contact from './component/Contact';
import About from './component/About';


import Header from './component/Header';
import { Login } from './component/Login';
import { Customer } from './component/Customer';
import { Admin } from './component/Admin';
import { AddCatch } from './component/AddCatch';


import Temp from "D:/SupplyChain/client/src/component/Temp.js"
import abi from "./contract/SupplyChain.json"

// eslint-disable-next-line no-unused-vars
import { ethers } from 'ethers';
import { Distribution } from './component/Distribution';
import { Packaging } from './component/Packaging';
import { InitiateShip } from './component/InitiateShip';
import { UpdateShimpent } from './component/UpdateShimpent';
import { GetShipment } from './component/GetShipment';
import { ShowingDetails } from './component/ShowingDetails';




// function App() {

  

//   return (
//     <div className="App">
      
      
//       <Login/>

//     </div>
    
//   );
// }

// class App extends Component {
//   render() {
//     return (
//     <Router>
//         <div>
//           <h2>Welcome to React Router Tutorial</h2>
//           <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <ul className="navbar-nav mr-auto">
//             <li><Link to={'/'} className="nav-link"> Home </Link></li>
//             <li><Link to={'/contact'} className="nav-link">Contact</Link></li>
//             <li><Link to={'/about'} className="nav-link">About</Link></li>
//           </ul>
//           </nav>
//           <hr />
//           <Routes>
//               <Route exact path='/' component={Home} />
//               <Route path='/contact' component={Contact} />
//               <Route path='/about' component={About} />
//           </Routes>
//         </div>
//       </Router>
//     );
//   }
// }

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addcatch" element={<AddCatch />} />
          <Route path="/dist" element={<Distribution />} />
          <Route path="/packaging" element={<Packaging />} />
          <Route path="/inishipment" element={<InitiateShip />} />
          <Route path="/updateshipment" element={<UpdateShimpent />} />
          <Route path="/getshipment" element={<GetShipment />} />
          <Route path="/showdetail" element={<ShowingDetails />} />

          



          

          





        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import React, { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   function handleClick() {
//     setCount(count + 1);
//   }

//   return (
//     <div>
//       <p>You clicked {count} times.</p>
//       <button onClick={handleClick}>Click me</button>
//     </div>
//   );
// }

// export default Counter;

