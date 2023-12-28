import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_INCOME } from "../utils/mutations";
import { Link } from "react-router-dom";
import AuthService from "../utils/auth";

const AddIncome = () => {
    // define a useState hook for setting the formState object fields. Initialize the object fields with empty strings.
    const [incomeInfo, setIncomeInfo] = useState({
        incomeName: '',
        incomeAmount: '',
        // incomeDate: '',
        incomeFrequency: '',
    });
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
                    // incomeDate: incomeInfo.incomeDate.toISOString(),
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

    const handleDateChange = (date) => {
        setIncomeInfo({
            ...incomeInfo,
            incomeDate: date,
        });
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
                {/* used react-datepicker for date input */}
                {/* <DatePicker
                    name="incomeDate"
                    selected={incomeInfo.incomeDate}
                    onChange={handleDateChange}
                    placeholderText="Enter income date"
                    dateFormat="MM/dd/yyyy"
                /> */}
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
                <button type="submit">Add Income</button>
            </form>
            {error && <div>Something went wrong...</div>}

            <div className="dashboardBtn">
                <Link to="/dashboard">Back to Dashboard</Link>
            </div>
        </div>
    );
}

export default AddIncome;