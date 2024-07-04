import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const OrderItem = ({ order }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '10px', marginBottom: '15px' }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    Order Date: {new Date(order.date).toLocaleDateString()}
                </Typography>
                <Grid container direction="column">
                    <Typography variant="body2" color="text.secondary">
                        {order.name} - Quantity: {order.quantity}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default OrderItem;
