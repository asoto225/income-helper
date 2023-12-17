import React from "react";
import Dashboard from "../components/Dashboard";
import { Link } from "react-router-dom";

export default function DashboardPage() {
    return (
        <div>
            <h1>Dashboard Page</h1>
            <div>
                <Dashboard />
            </div>
            <div>
                <Link to="/addExpense">Add Expense</Link>
            </div>
            <div>
                <Link to="/addIncome">Add Income</Link>
            </div>
        </div>
    );
};