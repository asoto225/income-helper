import React from "react";
import AddIncome from "../components/addIncome";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import Nav from "../components/nav";

const AddIncomePage = () => {
    const isLoggedIn = AuthService.loggedIn();
    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <div>
                        <Nav />
                    </div>
                    <div>
                        <AddIncome />
                    </div>
                </div>
            ) : 
            <div>
                <h2>Please log in to view this page.</h2> <br />
                <Link to="/">Login</Link>
            </div>
            }
        </div>
    )
};
export default AddIncomePage;