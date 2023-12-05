const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        income: [Income]
        expense: [Expense]
    }

    type Income {
        _id: ID
        incomeName: String
        incomeAmount: Int
        incomeDate: String
        incomeFrequency: String
    }

    type Expense {
        _id: ID
        expenseName: String
        expenseAmount: Int
        expenseDate: String
        expenseFrequency: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(username: String!): User
        income(username: String): [Income]
        expense(username: String): [Expense]
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addIncome(incomeName: String!, incomeAmount: Int!, incomeDate: String!, incomeFrequency: String!): Income
        addExpense(expenseName: String!, expenseAmount: Int!, expenseDate: String!, expenseFrequency: String!): Expense
    }
`;

module.exports = typeDefs;