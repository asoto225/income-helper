import React, { useState } from "react";
import Dashboard from "../components/dashboard";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import Nav from "../components/nav";

const DashboardPage = () => {
    const isLoggedIn = AuthService.loggedIn();
    // const [modalOpen, setModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    const handleEdit = (id) => {
        setItemToEdit(id);

        setModalOpen(true);
    }


    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <div>
                        <Nav />
                    </div>
                    {/* <h1>Dashboard Page</h1> */}
                    <div className="mainContent">
                        <Dashboard />
                    </div>
                    {/* <button className="btn" onClick={() => { setModalOpen(true) }}>Add</button>
                    <div>
                        {modalOpen && (
                            <Modal
                                closeModal={() => {
                                    setModalOpen(false);
                                }}
                            />
                        )}
                    </div> */}
                </div>
            ) : (
                <div>
                    <h2>Please log in to view this page.</h2> <br />
                    <Link to="/">Login</Link>
                </div>
            )}
        </div>
    )
};

export default DashboardPage;