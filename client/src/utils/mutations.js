import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_INCOME = gql`
    mutation addIncome($incomeName: String!, $incomeAmount: Int!, $incomeDate: String!, $incomeFrequency: String!){
        addIncome(incomeName: $incomeName, incomeAmount: $incomeAmount, incomeDate: $incomeDate, incomeFrequency: $incomeFrequency){
            income {
                _id
                incomeName
                incomeAmount
                incomeDate
                incomeFrequency
            }
        }
    }
`;

export const ADD_EXPENSE = gql`
    mutation addExpense($expenseName: String!, $expenseAmount: Int!, $expenseDate: String!, $expenseFrequency: String!){
        addExpense(expenseName: $expenseName, expenseAmount: $expenseAmount, expenseDate: $expenseDate, expenseFrequency: $expenseFrequency){
            expense {
                _id
                expenseName
                expenseAmount
                expenseDate
                expenseFrequency
            }
        }
    }
`;