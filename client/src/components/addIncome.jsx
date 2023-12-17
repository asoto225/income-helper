import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_INCOME } from "../utils/mutations";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

const AddIncome = () => {
    const [incomeInfo, setIncomeInfo] = useState({
        incomeName: '',
        incomeAmount: '',
        incomeDate: '',
        incomeFrequency: '',
    });
    const [addIncome, { error }] = useMutation(ADD_INCOME);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addIncome({
                variables: { 
                    incomeName: incomeInfo.incomeName,
                    incomeAmount: parseInt(incomeInfo.incomeAmount),
                    incomeDate: incomeInfo.incomeDate.toDate(),
                    incomeFrequency: incomeInfo.incomeFrequency,
                    incomeAuthor: AuthService.getProfile().data.username,
                 },
            });
            console.log("income added successfully:",data);
            window.alert("Income added successfully");
            setIncomeInfo({ incomeName: '', incomeAmount: '', incomeDate: '', incomeFrequency: '' });
        } catch (e) {
            console.error(e);
            window.alert("Something went wrong, please try again.");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setIncomeInfo({
            ...incomeInfo,
            [name]: value,
        });
    }

    return (
        <div>
            <h1>Add Income</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    name="incomeName"
                    type="text"
                    placeholder="Enter income name"
                    value={incomeInfo.incomeName}
                    onChange={handleChange}
                />
                <input
                    name="incomeAmount"
                    type="number"
                    placeholder="Enter income amount"
                    value={incomeInfo.incomeAmount}
                    onChange={handleChange}
                />
                {/* need to fix so that the date renders properly, maybe in the models? */}
                <input
                    name="incomeDate"
                    type="date"
                    placeholder="Enter income date MM/DD/YYYY"
                    value={incomeInfo.incomeDate}
                    onChange={handleChange}
                />
                <input
                    name="incomeFrequency"
                    type="text"
                    placeholder="Enter income frequency"
                    value={incomeInfo.incomeFrequency}
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

export default AddIncome;