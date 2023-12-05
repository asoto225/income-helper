import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            income {
                _id
                incomeName
                incomeAmount
                incomeDate
                incomeFrequency
            }
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

export const QUERY_INCOME = gql`
    query income($username: String) {
        income(username: $username) {
            _id
            incomeName
            incomeAmount
            incomeDate
            incomeFrequency
        }
    }
`;

export const QUERY_EXPENSE = gql`
    query expense($username: String) {
        expense(username: $username) {
            _id
            expenseName
            expenseAmount
            expenseDate
            expenseFrequency
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            income {
                _id
                incomeName
                incomeAmount
                incomeDate
                incomeFrequency
            }
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