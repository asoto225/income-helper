import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { DELETE_INCOME, DELETE_EXPENSE, EDIT_EXPENSE, EDIT_INCOME } from "../utils/mutations";
import AuthService from "../utils/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { loading, error, data, refetch } = useQuery(QUERY_ME);
    const [deleteIncome] = useMutation(DELETE_INCOME);
    const [deleteExpense] = useMutation(DELETE_EXPENSE);

    useEffect(() => {
        refetch();
    }, []);

    const logout = () => {
        AuthService.logout();
    };

    const user = data && data.me;

    if (!user) {
        return <h2>Not logged in!</h2>;
    }

    // finding the username, income, and expense data from the user object and console logging it.
    const username = user.username;
    const income = user.incomes;
    const expense = user.expenses;

    // calculates total income, also adjusts biweekly income to monthly income by multiplying by 2 for biweekly frequency, multiplies by 4 for weekly. 
    const totalIncome = income.reduce((total, income) => {
        const adjustedAmount =
            income.incomeFrequency === "Biweekly" ? income.incomeAmount * 2 :
                income.incomeFrequency === "Weekly" ? income.incomeAmount * 4 :
                    income.incomeAmount;
        return total + adjustedAmount;
    }, 0);
    // calculates total expenses, also adjusts biweekly expenses to monthly expenses by multiplying by 2 for biweekly frequency, multiplies by 4 for weekly.
    const totalExpense = expense.reduce((total, expense) => {
        const adjustedAmount =
            expense.expenseFrequency === "Biweekly" ? expense.expenseAmount * 2 :
                expense.expenseFrequency === "Weekly" ? expense.expenseAmount * 4 :
                    expense.expenseAmount;
        return total + adjustedAmount;
    }, 0);

    const totalNetIncome = totalIncome - totalExpense;

    //delete income function
    const handleDeleteIncome = async (incomeId) => {
        try {
            await deleteIncome({
                variables: { incomeId },
            });
            window.alert("Income deleted successfully");
            refetch();
        } catch (e) {
            console.error(e);
            window.alert("Something went wrong, please try again.");
        }
    };

    //delete expense function
    const handleDeleteExpense = async (expenseId) => {
        try {
            await deleteExpense({
                variables: { expenseId },
            });
            window.alert("Expense deleted successfully");
            refetch();
        } catch (e) {
            console.error(e);
            window.alert("Something went wrong, please try again.");
        }
    };

    const disappear = () => {
        if (income.length === 0 && expense.length === 0) {
            return { display: "none" };
        } else {
            return { display: "block" };
        }
    }

    return (
        <div>
            <h1 className="welcomeMessage">Welcome, {username} </h1>
            <div className="displayData">
                <div className="expensesAndIncome">
                    <div className="expensesAndIncomeData">
                        {/* Renders income data by mapping through income attached to the user. */}
                        <h2 className="incomeTitle">Income:</h2>
                        {(income.length === 0) ? <p className="noData">No income added yet. Add your income to get started!</p> : null}
                        {income.map((income) => (
                            <div key={income._id} className="incomeData">
                                <div>
                                    <div>
                                        Name: {income.incomeName}
                                    </div>
                                    <div>
                                        Income Amount: {income.incomeAmount}
                                    </div>
                                    <div>
                                        Frequency: {income.incomeFrequency}
                                    </div>
                                    <button className="btn delete" onClick={() => handleDeleteIncome(income._id)}>Delete</button>
                                    <Link className="btn edit" to={`/editIncomePage/${income._id}`}>Edit</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="expensesAndIncomeData">
                        {/* Renders expense data by mapping through the expenses attached to the user. */}
                        <h2 className="expenseTitle">Expenses:</h2>
                        {(expense.length === 0) ? <p className="noData">No expenses added yet. Add your expenses to get started!</p> : null}
                        {expense.map((expense) => (
                            <div key={expense._id} className="expenseData">
                                <div>
                                    <div>
                                        Name: {expense.expenseName}
                                    </div>
                                    <div>
                                        Expense Amount: {expense.expenseAmount}
                                    </div>
                                    <div>
                                        Frequency: {expense.expenseFrequency}
                                    </div>
                                    <button className="btn delete" onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
                                    <Link className="btn edit"
                                        to={`/editExpensePage/${expense._id}`}>Edit</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                { (income.length === 0 && expense.length === 0) ? null : ( 
                <div className="totals">
                        <div className="totalsData">
                            <h2>Total Monthly Income:</h2>
                            <div>
                                {totalIncome}
                            </div>
                        </div>
                        <div className="totalsData">
                            <h2>Total Monthly Expenses:</h2>
                            <div>
                                {totalExpense}
                            </div>
                        </div>
                        <div className="totalsData">
                            <h2>Monthly Net Income:</h2>
                            <div>
                                {totalNetIncome}
                            </div>
                        </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard;
