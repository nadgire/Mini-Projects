import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { TextField, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const handleSignup = async (values, { setSubmitting, resetForm }) => {
        setError('');
        try {
            const signupObj = { email: values.email, password: values.password, accountStatus: "verification pending" };
            const response = await axios.post('http://localhost:5000/users/signup', signupObj);

            if (response.data.message === 'Registration successful') {
                const otpResponse = await axios.post('http://localhost:5000/users/send-otp', { email: values.email });
                if (otpResponse.data.message === 'OTP sent successfully') {
                    setOtpSent(true);
                    setEmail(values.email);
                    setMessage('OTP sent to your email. Please check your inbox.');
                } else {
                    setError('Failed to send OTP. Try again.');
                }
            }

            if (response.data.message === "User exists.") {
                setError("User already exists. Try with a different email.");
            }

            resetForm();
        } catch (error) {
            setError('Signup error: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleVerifyOtp = async () => {
        setError('');
        try {
            const verifyOtpObj = { email: email, otp: parseInt(otp) };
            const response = await axios.post('http://localhost:5000/users/verifyotp', verifyOtpObj);

            if (response.data.message === 'OTP verified successfully') {
                setOtpVerified(true);
                setMessage('OTP verified successfully!');
                setTimeout(() => handleCompleteSignup(), 1000);
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (error) {
            setError('OTP verification failed. Please try again later.');
        }
    };

    const handleCompleteSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/complete-signup', { email });
            if (response.data.message === 'Signup successful, account verified') {
                setMessage('Signup completed successfully!');
                alert('Signup completed. Redirecting to login...');
                navigate('/');
            }
        } catch (error) {
            setError('Failed to complete signup. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {otpSent && !otpVerified ? 'Verify OTP' : 'Sign Up'}
                </h2>

                {!otpSent ? (
                    <Formik
                        initialValues={{ email: '', password: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSignup}
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
                                                onChange={handleChange}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="mb-4">
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
                                                onChange={handleChange}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="mb-6">
                                    <Field name="confirmPassword">
                                        {({ field, meta }) => (
                                            <TextField
                                                {...field}
                                                label="Confirm Password"
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
                                    Request OTP
                                </Button>
                                <div className="flex justify-center items-center mt-4">
                                    <Link
                                        href="/"
                                        variant="body2"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : otpVerified ? (
                    <div className="flex justify-center items-center flex-col">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCompleteSignup}
                            fullWidth
                            sx={{ padding: '10px', marginBottom: '10px' }}
                        >
                            Complete Signup
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-xl font-semibold text-center mb-4">Enter OTP</h3>
                        <div className="mb-4">
                            <TextField
                                label="Enter OTP"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ padding: '10px', marginBottom: '10px' }}
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </Button>
                        <div className="flex justify-center items-center mt-4">
                            <Link
                                href="/"
                                variant="body2"
                                sx={{ textDecoration: 'none' }}
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                )}

                {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
        </div>
    );
};

export default Signup;
