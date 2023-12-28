import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXPENSE } from "../utils/mutations";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";
import '../App.css'

const AddExpense = () => {
    const [expenseInfo, setExpenseInfo] = useState({
        expenseName: '',
        expenseAmount: '',
        // expenseDate: '',
        expenseFrequency: '',
    });
    const [addExpense, { error }] = useMutation(ADD_EXPENSE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addExpense({
                variables: {
                    expenseName: expenseInfo.expenseName,
                    expenseAmount: parseInt(expenseInfo.expenseAmount),
                    // expenseDate: expenseInfo.expenseDate,
                    expenseFrequency: expenseInfo.expenseFrequency,
                    expenseAuthor: AuthService.getProfile().data.username,
                 },
            });
            console.log("expense added successfully:",data);
            window.alert("expense added successfully");
            // delete expenseDate if no longer needed once finished. 
            setExpenseInfo({ expenseName: '', expenseAmount: '', expenseDate: '', expenseFrequency: '' });
        } catch (e) {
            console.error(e);
            window.alert("Something went wrong, please try again.");
        }
    };

    const handleDateChange = (date) => {
        setExpenseInfo({
            ...expenseInfo,
            expenseDate: date,
        });
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
            <h1>Add Expense</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    name="expenseName"
                    type="text"
                    placeholder="Enter expense name"
                    value={expenseInfo.expenseName}
                    onChange={handleChange}
                />
                <input
                    name="expenseAmount"
                    type="number"
                    placeholder="Enter expense amount"
                    value={expenseInfo.expenseAmount}
                    onChange={handleChange}
                />
                {/* need to fix so that the date renders properly, maybe in the models? */}
                {/* <DatePicker
                    name="expenseDate"
                    selected={expenseInfo.expenseDate}
                    onChange={handleDateChange}
                    placeholderText="Enter expense date"
                    dateFormat="MM/dd/yyyy"
                /> */}
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
                <button type="submit">Add Expense</button>
            </form>
            {error && <div>Something went wrong...</div>}

            <div className="dashboardBtn">
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
}

export default AddExpense;