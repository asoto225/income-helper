import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { QUERY_EXPENSE } from "../utils/queries";
import { EDIT_EXPENSE } from "../utils/mutations";

const EditExpense = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [expenseData, setExpenseData] = useState({
        name: "",
        amount: "",
        frequency: "",
    });

    const { loading, data } = useQuery(QUERY_EXPENSE, {
        variables: { _id: id }
    });

    const [editExpense, { error }] = useMutation(EDIT_EXPENSE);

    useEffect(() => {
        if (data && data.expense) {
            const { expenseName, expenseAmount, expenseFrequency } = data.expense;
            setExpenseData({
                name: expenseName,
                amount: expenseAmount,
                frequency: expenseFrequency,
            });
        }
        console.log("fetched data:", data);
    }, [data]);

    const handleExpenseEdit = () => {
        editExpense({
            variables: {
                expenseId: id,
                expenseName: expenseData.name,
                expenseAmount: parseInt(expenseData.amount),
                expenseFrequency: expenseData.frequency,
            },
        });
        window.alert("Expense edited successfully!");
        console.log("expenseData:", expenseData)
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
            <h1>Edit Expense Page</h1>
            <label>
                Name:
                <input
                    type="text"
                    value={expenseData.name}
                    onChange={(e) => setExpenseData({ ...expenseData, name: e.target.value })}
                />
            </label>
            <label>
                Amount:
                <input
                    type="number"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                />
            </label>
            <label>
                Frequency:
                <select
                    type="text"
                    value={expenseData.frequency}
                    onChange={(e) => setExpenseData({ ...expenseData, frequency: e.target.value })}
                >
                    <option value="Weekly">Weekly</option>
                    <option value="Biweekly">Biweekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
            </label>
            <button onClick={handleExpenseEdit}>Save Changes</button>
            <h2>Edit Page</h2>
            <p>Data: {id}</p>
            <p>Data:</p>
        </div>
    )
}

export default EditExpense;