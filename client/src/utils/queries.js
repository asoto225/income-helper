import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            incomes {
                _id
                incomeName
                incomeAmount
                incomeFrequency
                incomeAuthor
            }
            expenses {
                _id
                expenseName
                expenseAmount
                expenseFrequency
                expenseAuthor
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            incomes {
                _id
                incomeName
                incomeAmount
                incomeFrequency
                incomeAuthor
            }
            expenses {
                _id
                expenseName
                expenseAmount
                expenseFrequency
                expenseAuthor
            }
        }
    }
`;

export const QUERY_INCOMES = gql`
    query incomes {
        incomes {
            _id
            incomeName
            incomeAmount
            incomeFrequency
            incomeAuthor
        }
    }
`;

export const QUERY_INCOME = gql`
    query income($username: String) {
        income(username: $username) {
            _id
            incomeName
            incomeAmount
            incomeFrequency
            incomeAuthor
        }
    }
`;

export const QUERY_EXPENSES = gql`
    query expenses {
        expenses {
            _id
            expenseName
            expenseAmount
            expenseFrequency
            expenseAuthor
        }
    }
`;

export const QUERY_EXPENSE = gql`
    query expense($username: String) {
        expense(username: $username) {
            _id
            expenseName
            expenseAmount
            expenseFrequency
            expenseAuthor
        }
    }
`;

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            incomes {
                _id
                incomeName
                incomeAmount
                incomeFrequency
                incomeAuthor
            }
            expenses {
                _id
                expenseName
                expenseAmount
                expenseFrequency
                expenseAuthor
            }
        }
    }
`;