import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EXPENSE } from "../utils/mutations";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

const AddExpense = () => {
    const [expenseInfo, setExpenseInfo] = useState({
        expenseName: '',
        expenseAmount: '',
        expenseDate: '',
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
                    expenseDate: expenseInfo.expenseDate,
                    expenseFrequency: expenseInfo.expenseFrequency,
                    expenseAuthor: AuthService.getProfile().data.username,
                 },
            });
            console.log("expense added successfully:",data);
            window.alert("expense added successfully");
            setExpenseInfo({ expenseName: '', expenseAmount: '', expenseDate: '', expenseFrequency: '' });
        } catch (e) {
            console.error(e);
            window.alert("Something went wrong, please try again.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIncomeInfo({
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
                <input
                    name="expenseDate"
                    type="date"
                    placeholder="Enter expense date MM/DD/YYYY"
                    value={expenseInfo.expenseDate}
                    onChange={handleChange}
                />
                <input
                    name="expenseFrequency"
                    type="text"
                    placeholder="Enter expense frequency"
                    value={expenseInfo.expenseFrequency}
                    onChange={handleChange}
                />
                <button type="submit">Add Income</button>
            </form>
            {error && <div>Something went wrong...</div>}

            <div>
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
}

export default AddExpense;