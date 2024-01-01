import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import Nav from "../components/nav";
import EditExpense from "../components/editExpense";

const EditExpensePage = () => {
    const isLoggedIn = AuthService.loggedIn();
    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <div>
                        <Nav />
                    </div>
                    <div>
                        <EditExpense />
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
}

export default EditExpensePage;