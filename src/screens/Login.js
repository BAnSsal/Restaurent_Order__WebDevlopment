// Login.js

import React from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/loginuser', data);
            console.log('Response data:', response.data);
            if (response.data.user && response.data.user.email) {
                localStorage.setItem('useremail', response.data.user.email);
                console.log('Email stored in localStorage:', response.data.user.email);
            } else {
                console.error('Email not found in response');
            }
            localStorage.setItem('authToken', response.data.token);
            navigate('/'); // Navigate to home or dashboard after successful login
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    
    

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8
                }}
            >
                <Typography component="h1" variant="h5">
                    Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        label="Email"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, backgroundColor: 'orange', color: 'white' }} // Adjust colors
                    >
                        Log In
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                        Don't have an account? 
                            <Link component={RouterLink} to="/signup" variant="body2">
                              Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
