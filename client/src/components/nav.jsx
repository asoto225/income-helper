import React from "react";
import { NavLink } from "react-router-dom";
import AuthService from "../utils/auth";


const AddNav = () => {
    const isLoggedIn = AuthService.loggedIn();

    return isLoggedIn ? (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                <NavLink to="/dashboard" className="navbar-brand">
                    Expense Tracker
                </NavLink>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/addIncome" className="nav-link" activeClassName="active-link">
                            Add Income
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/addExpense" className="nav-link" activeClassName="active-link">
                            Add Expense
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>

    ) : null;
};

export default AddNav;