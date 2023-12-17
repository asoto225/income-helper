const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        incomes: [Income]
        expenses: [Expense]
    }

    type Income {
        _id: ID
        incomeName: String
        incomeAmount: Int
        incomeDate: String
        incomeFrequency: String
        incomeAuthor: String
    }

    type Expense {
        _id: ID
        expenseName: String
        expenseAmount: Int
        expenseDate: String
        expenseFrequency: String
        expenseAuthor: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        incomes: [Income]
        income(_id: ID!): Income
        expenses: [Expense]
        expense(_id: ID!): Expense
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