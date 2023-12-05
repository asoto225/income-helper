import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import AuthService from "../utils/auth";
import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
    return (
        <div>
        <h1>Dashboard Page</h1>
        <Dashboard />
        </div>
    );
};