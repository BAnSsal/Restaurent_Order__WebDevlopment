import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodList from './components/body.js';
import Cart from './components/Cart';
import Footer from './components/Footer.js';
import CartPortal from './screens/CartPortal.js'; // Import the CartPortal component
import { Button } from '@mui/material';
import axios from 'axios';
// Import images
import dosaImg from './components/static/indian_dosa.jpg';
 // Use a different image here

function Home() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [foodItems, setFoodItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control the cart portal visibility
  const navigate = useNavigate(); // Declare useNavigate hook

  useEffect(() => {
    const fetchFoodItems = async () => {
      try { 
        const response = await fetch('http://localhost:5000/api/fooditems');
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
  
    fetchFoodItems();
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    let updatedTotal = total + item.price;
    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      const updatedCartItems = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(updatedCartItems);
    }
    setTotal(updatedTotal);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    let updatedTotal = total - updatedCart[index].price;
    if (updatedCart[index].quantity === 1) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index].quantity -= 1;
    }
    setCartItems(updatedCart);
    setTotal(updatedTotal);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    setTotal(total + updatedCart[index].price);
  };

  const handleOpenCart = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("useremail");
    console.log('Retrieved email from localStorage:', userEmail);
    if (!userEmail) {
      alert('Please log in to complete the purchase.');
      return;
    }

    const orderData = {
      email: userEmail,
      order_date: new Date(),
      order_data: cartItems
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orderdata', orderData);
      console.log('Order placed successfully:', response.data);
      setCartItems([]);
      setTotal(0);
      // Handle successful order (e.g., navigate to order confirmation page)
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error (e.g., show error message)
    }
  };

  const handleMyOrder = () => {
    setIsCartOpen(false);
    navigate('/orders'); // Navigate to the orders page
  };

  return (
    <>
      <Navbar handleOpenCart={handleOpenCart} />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          <Cart cartItems={cartItems} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} total={total} handleCheckout={handleCheckout} />
          <div style={{ marginRight: '30px', flex: 1 }}>
            <FoodList addToCart={addToCart} foodItems={foodItems} />
          </div>
        </div>
        <Footer />
      </div>
      <CartPortal
  isOpen={isCartOpen}
  onClose={handleCloseCart}
  cartItems={cartItems}
  removeFromCart={removeFromCart}
  increaseQuantity={increaseQuantity}
  total={total}
  checkout={handleCheckout}
  handleMyOrder={handleMyOrder}
/>

    </>
  );
}

export default Home;