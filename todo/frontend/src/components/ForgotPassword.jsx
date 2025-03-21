import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RequestOtp = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);  // State to track if OTP is sent
    const [otpVerified, setOtpVerified] = useState(false);  // State to track if OTP is verified
    const [otp, setOtp] = useState('');  // State to store OTP input for verification
    const [email, setEmail] = useState('');  // Store email for password reset
    const navigate = useNavigate(); // Initialize navigate function

    const handleRequestOtp = async (values, { setSubmitting }) => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/users/request-otp', { email: values.email });

            if (response.data.message === 'OTP sent successfully') {
                setMessage('OTP has been sent to your email.');
                setOtpSent(true);  // Show OTP verification form
                setEmail(values.email);  // Store email to use for password reset
            } else {
                setError('Failed to send OTP. Please try again.');
            }
        } catch (err) {
            setError('Error occurred. Please try again later.');
        } finally {
            setLoading(false);
            setSubmitting(false);  // Stop submitting state once the request completes
        }
    };

    const handleVerifyOtp = async (values, { setSubmitting }) => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/users/verify-otp', { email: values.email, otp: values.otp });

            if (response.data.message === 'OTP verified successfully') {
                setMessage('OTP verified successfully!');
                setOtpVerified(true);  // Allow password reset form to show
            } else {
                setError('Invalid OTP or OTP expired. Please try again.');
            }
        } catch (err) {
            setError('Error occurred. Please try again later.');
        } finally {
            setLoading(false);
            setSubmitting(false);  // Stop submitting state once the request completes
        }
    };

    const handleResetPassword = async (values, { setSubmitting }) => {
        setLoading(true);
        setMessage('');
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/users/reset-password', { email, password: values.password });

            if (response.data.message === 'Password reset successful') {
                setMessage('Password reset successfully!');
                // Redirect to the home page after successful password reset
                navigate('/');  // Redirect to home page
            } else {
                setError('Failed to reset password. Please try again.');
            }
        } catch (err) {
            setError('Error occurred. Please try again later.');
        } finally {
            setLoading(false);
            setSubmitting(false);  // Stop submitting state once the request completes
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">{otpVerified ? 'Reset Password' : 'Request OTP'}</h2>

                {!otpSent ? (
                    // OTP Request Form
                    <Formik
                        initialValues={{ email: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Email is required';
                            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={handleRequestOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2" />
                                </div>

                                {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
                                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                                <div>
                                    <button
                                        type="submit"
                                        className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
                                        disabled={isSubmitting || loading}
                                    >
                                        {loading ? 'Sending OTP...' : 'Send OTP'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : otpVerified ? (
                    // Password Reset Form
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.password) {
                                errors.password = 'Password is required';
                            } else if (values.password.length < 8) {
                                errors.password = 'Password must be at least 8 characters';
                            }
                            if (values.password !== values.confirmPassword) {
                                errors.confirmPassword = 'Passwords must match';
                            }
                            return errors;
                        }}
                        onSubmit={handleResetPassword}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter new password"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Confirm new password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-2" />
                                </div>

                                {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
                                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                                <div>
                                    <button
                                        type="submit"
                                        className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
                                        disabled={isSubmitting || loading}
                                    >
                                        {loading ? 'Resetting Password...' : 'Reset Password'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    // OTP Verification Form
                    <Formik
                        initialValues={{ email: '', otp: '' }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Email is required';
                            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.otp) {
                                errors.otp = 'OTP is required';
                            }
                            return errors;
                        }}
                        onSubmit={handleVerifyOtp}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your email"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-2" />
                                </div>

                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                                        OTP
                                    </label>
                                    <Field
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter OTP"
                                    />
                                    <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-2" />
                                </div>

                                {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
                                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

                                <div>
                                    <button
                                        type="submit"
                                        className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
                                        disabled={isSubmitting || loading}
                                    >
                                        {loading ? 'Verifying OTP...' : 'Verify OTP'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default RequestOtp;
