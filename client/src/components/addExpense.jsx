import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXPENSE } from "../utils/mutations";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../utils/auth";
import '../App.css'

const AddExpense = () => {
    const [expenseInfo, setExpenseInfo] = useState({
        expenseName: '',
        expenseAmount: '',
        expenseFrequency: '',
    });

    const navigate = useNavigate();

    const [addExpense, { error }] = useMutation(ADD_EXPENSE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addExpense({
                variables: {
                    expenseName: expenseInfo.expenseName,
                    expenseAmount: parseInt(expenseInfo.expenseAmount),
                    expenseFrequency: expenseInfo.expenseFrequency,
                    expenseAuthor: AuthService.getProfile().data.username,
                 },
            });
            console.log("expense added successfully:",data);
            window.alert("expense added successfully");
            setExpenseInfo({ expenseName: '', expenseAmount: '', expenseFrequency: '' });
            navigate("/dashboard")
        } catch (e) {
            console.error(e);
            window.alert("Something went wrong, please try again.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpenseInfo({
            ...expenseInfo,
            [name]: value,
        });
    }

    return (
        <div>
            <h1 className="addTitle">Add Expense</h1>
            <form onSubmit={handleFormSubmit} className="form-group">
                Expense Name:
                <input
                    name="expenseName"
                    type="text"
                    placeholder="Enter expense name"
                    value={expenseInfo.expenseName}
                    onChange={handleChange}
                />
                Expense Amount:
                <input
                    name="expenseAmount"
                    type="number"
                    placeholder="Enter expense amount"
                    value={expenseInfo.expenseAmount}
                    onChange={handleChange}
                />
                Expense Frequency: 
                <select
                    name="expenseFrequency"
                    value={expenseInfo.expenseFrequency}
                    onChange={handleChange}
                >
                    <option value="">Select expense frequency</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Biweekly">Biweekly</option>
                    <option value="Weekly">Weekly</option>
                </select>
                <button type="submit" className="btn">Submit</button>
                <Link to="/dashboard" className="btn delete">Cancel</Link>
            </form>
            {error && <div>Something went wrong...</div>}
        </div>
    );
}

export default AddExpense;