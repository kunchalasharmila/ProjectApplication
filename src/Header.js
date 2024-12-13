import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <>
            <header className="header-container">
                <div className="header-content">
                    <h2 className="company-title">
                        <b>Amaze Company</b>
                    </h2>
                    <nav className="navigation">
                        <ul className="nav-list">
                            {!isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>  
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/projects">Projects</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/featureIntrests">Feature Interests</Link>
                                    </li>
                                    <div>
                                        <li className="nav-item">
                                            <button className="logout-button" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </div>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

        </>
    );
};

export default Header;
