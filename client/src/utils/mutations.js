import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
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
            }
        }
    }
`;

export const ADD_INCOME = gql`
    mutation addIncome($incomeName: String!, $incomeAmount: Int!, $incomeFrequency: String!){
        addIncome(incomeName: $incomeName, incomeAmount: $incomeAmount, incomeFrequency: $incomeFrequency){
                _id
                incomeName
                incomeAmount
                incomeFrequency
                incomeAuthor
        }
    }
`;

export const ADD_EXPENSE = gql`
    mutation addExpense($expenseName: String!, $expenseAmount: Int!, $expenseFrequency: String!){
        addExpense(expenseName: $expenseName, expenseAmount: $expenseAmount, expenseFrequency: $expenseFrequency){
                _id
                expenseName
                expenseAmount
                expenseFrequency
                expenseAuthor
        }
    }
`;

export const DELETE_INCOME = gql`
    mutation deleteIncome($incomeId: ID!){
        deleteIncome(incomeId: $incomeId){
            _id
            incomeName
            incomeAmount
            incomeFrequency
            incomeAuthor
        }
    }
`;

export const DELETE_EXPENSE = gql`
    mutation deleteExpense($expenseId: ID!){
        deleteExpense(expenseId: $expenseId){
            _id
            expenseName
            expenseAmount
            expenseFrequency
            expenseAuthor
        }
    }
`;