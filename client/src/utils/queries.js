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
    query income($_id: ID!) {
        income(_id: $_id) {
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
    query expense($_id: ID!) {
        expense(_id: $_id) {
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