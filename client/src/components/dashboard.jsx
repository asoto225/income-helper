import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import AuthService from "../utils/auth";

const Dashboard = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    const logout = () => {
        AuthService.logout();
    };
    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        console.error(error);
        return <h2>Error!</h2>;
    }

    const user = data && data.me;

    if (!user) {
        return <h2>Not logged in!</h2>;
    }

    // finding the username, income, and expense data from the user object and console logging it.
    const username = user.username;
    console.log(username);
    const income = user.incomes;
    console.log(income, 'income');
    const expense = user.expenses;
    console.log(expense, 'expense');
    
    // calculates total income, also adjusts biweekly income to monthly income by multiplying by 2 for biweekly frequency. 
    const totalIncome = income.reduce((total, income) => {
        const adjustedAmount = income.incomeFrequency === "biweekly" ? income.incomeAmount * 2 : income.incomeAmount;
        return total + adjustedAmount;
    } , 0);
    // calculates total expenses, also adjusts biweekly expenses to monthly expenses by multiplying by 2 for biweekly frequency.
    const totalExpense = expense.reduce((total, expense) => {
        const adjustedAmount = expense.expenseFrequency === "biweekly" ? expense.expenseAmount * 2 : expense.expenseAmount;
        return total + adjustedAmount;
    }, 0);

    return (
        <div>
            <h1>Welcome, {username} </h1>
            <button onClick={logout}>Logout</button>
            {/* Renders expense data by mapping through the expenses attached to the user. */}
            <div>
                <h2>Expenses:</h2> {expense.map((expense) => (
                    <div key={expense._id}>
                        <div>
                            <div>
                                Name: {expense.expenseName}
                            </div>
                            <div>
                                Expense Amount: {expense.expenseAmount}
                            </div>
                            <div>
                                Pay Date: {new Date(expense.expenseDate).toLocaleDateString()}
                            </div>
                            <div>
                                Frequency: {expense.expenseFrequency}
                            </div>
                        </div>
                        <br />
                    </div>
                ))}
            </div>
            <div>
                {/* Renders income data by mapping through income attached to the user. */}
                <h2>Income:</h2> {income.map((income) => (
                <div key={income._id}>
                    <div>
                        <div>
                            Name: {income.incomeName}
                        </div>
                        <div>
                            Income Amount: {income.incomeAmount}
                        </div>
                        <div>
                            Pay Date: {new Date(income.incomeDate).toLocaleDateString()}
                        </div>
                        <div>
                            Frequency: {income.incomeFrequency}
                        </div>
                        <br />
                    </div>
                </div>
                ))}
            </div>
            <div>
                <h2>Total Monthly Income:</h2>
                <div>
                    {totalIncome}
                </div>
            </div>
            <div>
                <h2>Total Monthly Expenses:</h2>
                <div>
                    {totalExpense}
                </div>
            </div>
            <div>
                <h2>Monthly Net Income:</h2>
                <div>
                    {totalIncome - totalExpense}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
