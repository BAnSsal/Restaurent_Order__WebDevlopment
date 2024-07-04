
import Home from "./Home.js"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// App.js or index.js
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import Signup from './screens/signup.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./screens/Login.js";
import { CartProvider } from "./components/contextreducer.js";
import Orders from "./screens/MyOrder.js";
function App() {
  return (
    <CartProvider>
    <Router>
<div>
  <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route exact path="/Login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup />} />
    <Route path="/orders" element={<Orders/>} />
  </Routes>
</div>
    </Router>

    </CartProvider>
  );
}

export default App;
