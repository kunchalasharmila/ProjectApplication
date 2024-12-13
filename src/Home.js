import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 
import './Home.css';

const Home = () => {
    return (
        <div className="Home-layout">
            <h1>Welcome to Amaze Company</h1>
            <h2>Please Register or Login</h2>
            <p>To access our services, please register or log in to your account.</p>
            <div>
                <Link to="/register">
                    <button style={{ margin: '10px', backgroundColor: 'blue', color: 'white' }}>
                        Register
                    </button>
                </Link>
                <Link to="/login">
                    <button style={{ margin: '10px', backgroundColor: 'blue', color: 'white' }}>
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
