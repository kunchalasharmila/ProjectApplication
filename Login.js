import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Register.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,toast } from 'react-toastify';

const Login = ({ setIsLoggedIn,setUsername }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', server: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let hasErrors = false;
        setErrors({ email: '', password: '', server: '' });

        if (!email || email.trim().toLowerCase() === 'null' || email === 'null@gmail.com') {
            setErrors(prev => ({ ...prev, email: 'Email cannot be null or empty' }));
            hasErrors = true;
        } else if (!email.match(/^[A-Za-z0-9+_.-]+@gmail\.com$/)) {
            setErrors(prev => ({ ...prev, email: 'Email must be valid and end with @gmail.com' }));
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

        return !hasErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/userauth/login', {
                email,
                password,
            });
            const { username } = response.data.data; 
            setIsLoggedIn(true);
            setUsername(username); 
            //setSuccessMessage('Login successful');
            toast.success('Login successful.',{
                position:'top-right',
                //autoClose:2000,
            })
            setTimeout(() => {
                navigate('/Welcome');
            }, 2000);
        } catch (error) {
            const message = error.response?.data?.message || 'Invalid Credentials.';
            setErrors(prev => ({ ...prev, server: message }));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <div className="border w-50 m-auto p-3">
                <form onSubmit={handleSubmit}>
                    <div className="mt-3">
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={email}
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mt-3">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={password}
                            placeholder='Enter password'
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
                    {successMessage && <div className="text-success mt-3">{successMessage}</div>}
                    {errors.server && <div className="text-danger mt-3">{errors.server}</div>}
                    <div className="mt-3">
                        <large>Don't have an account? <a href="/register">Register here</a>.</large>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default Login;
