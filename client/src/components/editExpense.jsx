import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate, Link } from "react-router-dom";
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
            <h1 className="addTitle">Edit Expense</h1>
            <form className="form-group">
                Name:
                <input
                    type="text"
                    value={expenseData.name}
                    onChange={(e) => setExpenseData({ ...expenseData, name: e.target.value })}
                />

                Amount:
                <input
                    type="number"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                />

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
                <button onClick={handleExpenseEdit} className="btn">Save Changes</button>
                <Link to="/dashboard" className="btn delete">Cancel</Link>
            </form>
            {error && <div>Something went wrong, please try again...</div>}
        </div>
    )
}

export default EditExpense;