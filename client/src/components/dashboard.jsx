import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import AuthService from "../utils/auth";

const Dashboard = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    const logout = () => {
        AuthService.logout();
    };
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return <h2>Error!</h2>;
    }

    const user = data && data.me;

    if (!user) {
        return <h2>Not logged in!</h2>;
    }

    const username = user.username;
    console.log(username);

    return (
        <div>
            <h1>Welcome, {username} </h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard;
