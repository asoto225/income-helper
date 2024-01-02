import React from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../utils/auth";


const AddNav = () => {
    const isLoggedIn = AuthService.loggedIn();
    const logout = () => { AuthService.logout() };



    return isLoggedIn ? (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/dashboard" className="navbar-brand">
                    Expense Tracker
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/addIncome" className="nav-link">
                            Add Income
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/addExpense" className="nav-link">
                            Add Expense
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link logout" onClick={logout}>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>

    ) : null;
};

export default AddNav;