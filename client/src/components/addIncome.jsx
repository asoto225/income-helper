import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_INCOME } from "../utils/mutations";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../utils/auth";

const AddIncome = () => {
    // define a useState hook for setting the formState object fields. Initialize the object fields with empty strings.
    const [incomeInfo, setIncomeInfo] = useState({
        incomeName: '',
        incomeAmount: '',
        incomeFrequency: '',
    });
    const navigate = useNavigate();
    // define a useMutation hook for executing the ADD_INCOME mutation
    const [addIncome, { error }] = useMutation(ADD_INCOME);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // define an asnyc function to execute the mutation using the destructured formState object fields as arguments.
            const { data } = await addIncome({
                variables: { 
                    incomeName: incomeInfo.incomeName,
                    incomeAmount: parseInt(incomeInfo.incomeAmount),
                    incomeFrequency: incomeInfo.incomeFrequency,
                    incomeAuthor: AuthService.getProfile().data.username,
                 },
            });
            console.log("income added successfully:",data);
            window.alert("Income added successfully");
            setIncomeInfo({ incomeName: '', incomeAmount: '', incomeFrequency: '' });
            // navigate to dashboard
            navigate("/dashboard")
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
            <h1 className="addTitle">Add Income</h1>
            <form onSubmit={handleFormSubmit} className="form-group">
                Income Name:
                <input
                    name="incomeName"
                    type="text"
                    placeholder="Enter income name"
                    value={incomeInfo.incomeName}
                    onChange={handleChange}
                />
                Income Amount:
                <input
                    name="incomeAmount"
                    type="number"
                    placeholder="Enter income amount"
                    value={incomeInfo.incomeAmount}
                    onChange={handleChange}
                />
                Income Frequency:
                <select
                    name="incomeFrequency"
                    value={incomeInfo.incomeFrequency}
                    onChange={handleChange}
                >
                    <option value="">Select income frequency</option>
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

export default AddIncome;