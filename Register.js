import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', username: '', password: '', confirmPassword: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let hasErrors = false;
        setErrors({ email: '', username: '', password: '', confirmPassword: '' });

        // Email validation
        if (!email || email.trim().toLowerCase() === 'null' || email === 'null@gmail.com') {
            setErrors(prev => ({ ...prev, email: 'Email cannot be null or empty' }));
            hasErrors = true;
        } else if (!email.match(/^[A-Za-z0-9+_.-]+@gmail\.com$/)) {
            setErrors(prev => ({ ...prev, email: 'Email must be valid and end with @gmail.com' }));
            hasErrors = true;
        }

        // Username validation
        if (!username || username.trim().toLowerCase() === 'null') {
            setErrors(prev => ({ ...prev, username: 'Username cannot be empty or null' }));
            hasErrors = true;
        }else if(username.length < 3 || username.length > 50) {
            setErrors(prev => ({ ...prev, password: 'username  must be between 3 to 50characters' }));
            hasErrors = true;
        }

    
        // Password validation
        if (!password || password.trim().toLowerCase() === 'null') {
            setErrors(prev => ({ ...prev, password: 'Password cannot be empty or null' }));
            hasErrors = true;
        } else if(password.length < 6) {
            setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
            hasErrors = true;
        }

        // Confirm password validation
        if (!confirmPassword || confirmPassword.trim().toLowerCase() === 'null') {
            setErrors(prev => ({ ...prev, confirmPassword: 'Confirm Password cannot be empty or null' }));
            hasErrors = true;
        } else if (confirmPassword !== password) {
            setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
            hasErrors = true;
        }

        return !hasErrors;
    };

    // Checking if email is already registered
    const checkEmailAvailability = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/userauth/check-email/${email}`);
            if (response.data.success === false) {
                setErrors(prev => ({ ...prev, email: 'Email is already registered. Please choose another.' }));
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking email availability:', error);
            setErrors(prev => ({ ...prev, email: 'Email already registered. Please choose another.' }));
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        // Checking email 
        const isEmailAvailable = await checkEmailAvailability();
        if (!isEmailAvailable) {
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/userauth/register', {
                email,
                username,
                password,
                confirmPassword
            });

             //setSuccessMessage('Registration successful! You can now log in.');
            toast.success('Registration successful.',{
                position:'top-right',
                autoClose:2000
            })
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            setErrors(prev => ({ ...prev, server: message }));
        }
    };

    return (
        <div className="container mt-5">
             <ToastContainer/>
            <h2 className="text-center">Register</h2>
            <div className="border w-50 m-auto p-3">
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            placeholder='Enter Email Id'
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mt-3">
                        <label>Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={username}
                            placeholder='Enter User Name'
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        {errors.username && <span className="text-danger">{errors.username}</span>}
                    </div>
                    <div className="mt-3">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            placeholder='Enter Password'
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <div className="mt-3">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 mt-3"
                    >
                        Register
                    </button>
                    {successMessage && <div className="text-success mt-3">{successMessage}</div>}
                    {errors.server && <div className="text-danger mt-3">{errors.server}</div>}
                    <div className="mt-3">
                        <small>Already have an account? <a href="/login">Log in here</a>.</small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
