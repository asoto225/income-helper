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

    const username = user.username;
    console.log(username);
    const income = user.incomes;
    console.log(income, 'income');
    const expense = user.expenses;
    console.log(expense, 'expense');

    return (
        <div>
            <h1>Welcome, {username} </h1>
            <button onClick={logout}>Logout</button>
            <div>
                Expenses: {expense.map((expense) => (
                    <div key={expense._id}>
                        <div>
                            <div>
                                Name: {expense.expenseName}
                            </div>
                            <div>
                                Expense Amount: {expense.expenseAmount}
                            </div>
                            <div>
                                Pay Date: {expense.expenseDate}
                            </div>
                            <div>
                                Frequency: {expense.expenseFrequency}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                Income: {income.map((income) => (
                <div key={income._id}>
                    <div>
                        <div>
                            Name: {income.incomeName}
                        </div>
                        <div>
                            Income Amount: {income.incomeAmount}
                        </div>
                        <div>
                            Pay Date: {income.incomeDate}
                        </div>
                        <div>
                            Frequency: {income.incomeFrequency}
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
