import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { QUERY_INCOME } from "../utils/queries";
import { EDIT_INCOME } from "../utils/mutations";

const EditIncome = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [incomeData, setIncomeData] = useState({
        name: "",
        amount: "",
        frequency: "",
    });

    const { loading, data } = useQuery(QUERY_INCOME, {
        variables: { _id: id }
    });

    const [editIncome, { error }] = useMutation(EDIT_INCOME);

    useEffect(() => {
        if (data && data.income) {
            const { incomeName, incomeAmount, incomeFrequency } = data.income;
            setIncomeData({
                name: incomeName,
                amount: incomeAmount,
                frequency: incomeFrequency,
            });
        }
    }, [data]);

    const handleIncomeEdit = () => {
        editIncome({
            variables: {
                incomeId: id,
                incomeName: incomeData.name,
                incomeAmount: parseInt(incomeData.amount),
                incomeFrequency: incomeData.frequency,
            },
        });
        window.alert("Income edited successfully!");
        console.log("incomeData:", incomeData)
        navigate("/dashboard");
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error! {error.message}</div>
    }

    return (
        <div>
            <h1>Edit Page</h1>
            <label>
                Name:
                <input
                    type="text"
                    value={incomeData.name}
                    onChange={(e) => setIncomeData({ ...incomeData, name: e.target.value })}
                />
            </label>
            <label>
                Amount:
                <input
                    type="number"
                    value={incomeData.amount}
                    onChange={(e) => setIncomeData({ ...incomeData, amount: e.target.value })}
                />
            </label>
            <label>
                Frequency:
                <select
                    type="text"
                    value={incomeData.frequency}
                    onChange={(e) => setIncomeData({ ...incomeData, frequency: e.target.value })}
                >
                    <option value="Weekly">Weekly</option>
                    <option value="Biweekly">Biweekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </label>
            <button onClick={handleIncomeEdit}>Save Changes</button>
            <h2>Edit Page</h2>
            <p>Data: {id}</p>
            <p>Data:</p>
        </div>
    )
}

export default EditIncome;