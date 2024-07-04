import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            const userEmail = localStorage.getItem("useremail");
            if (!userEmail) {
                setError('Please log in to view your orders.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/api/orders', {
                    params: { email: userEmail }
                });

                console.log('API response:', response.data); // Log the response data

                if (response.data.length > 0) {
                    let orderItems = [];

                    response.data.forEach(order => {
                        console.log('Processing order:', order); // Log each order
                        order.order_data.forEach(orderData => {
                            console.log('Processing order data:', orderData); // Log each order data
                            const date2 =orderData.order_date;
                            console.log('date:',date2);
                            if (orderData && Array.isArray(orderData.order_data)) {
                                orderData.order_data.forEach(item => {
                                    console.log('Processing item:', item); // Log each item inside order data
                                    console.log('Item name:', item.name);
                                    console.log('Item order date:', date2);
                                    console.log('Item quantity:', item.quantity);
                                    // till here it is perfectly fine 
                                    if (item.name  && item.quantity) {
                                        const temp = {
                                            name: item.name,
                                            date: date2,
                                            quantity: item.quantity
                                        };
                                        
                                        orderItems.push(temp);
                                    }
                                });
                            } else {
                                console.warn('orderData.order_data is not an array or is missing:', orderData.order_data);
                            }
                        });
                    });

                    console.log('Parsed order items:', orderItems); // Log parsed order items
                    setOrders(orderItems);
                } else {
                    setError('No orders found for this user.');
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Error fetching orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h3>Your Orders</h3>
            {orders.length === 0 ? (
                <p>You have no orders.</p>
            ) : (
                orders.map((order, index) => (
                    <OrderItem key={index} order={order} />
                ))
            )}
        </div>
    );
}

export default Orders;
