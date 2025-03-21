import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const response = await axios.post("http://localhost:5000/users/login", values, {
                                withCredentials: true
                            });
                            if (response.data.message === "Login Successful") {
                                resetForm();
                                navigate("/dashboard");
                            } else if (response.data.message === "Verification pending") {
                                alert("Complete account verification by completing the forgot password process.");
                            } else if (response.data.message === "Account is deleted") {
                                alert("Account is deleted. Reactivate by completing the forgot password process.");
                            }
                        } catch (error) {
                            console.error('Login error', error);
                        }
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Field name="email">
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            error={meta.touched && Boolean(meta.error)}
                                            helperText={meta.touched && meta.error}
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className="mb-6">
                                <Field name="password">
                                    {({ field, meta }) => (
                                        <TextField
                                            {...field}
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            error={meta.touched && Boolean(meta.error)}
                                            helperText={meta.touched && meta.error}
                                        />
                                    )}
                                </Field>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{ padding: '10px', marginBottom: '10px' }}
                            >
                                Login
                            </Button>
                            <div className="flex flex-col justify-between items-center mt-4">
                                <Link
                                    href="/forgot-password"
                                    variant="body2"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Forgot Password?
                                </Link>
                                <Link
                                    href="/signup"
                                    variant="body2"
                                    sx={{ textDecoration: 'none' }}
                                >
                                    Don't have an account? Sign up
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
