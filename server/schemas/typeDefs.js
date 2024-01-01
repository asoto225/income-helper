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
        incomeFrequency: String
        incomeAuthor: String
    }

    type Expense {
        _id: ID
        expenseName: String
        expenseAmount: Int
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
    scalar DateTime
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addIncome(incomeName: String!, incomeAmount: Int!, incomeFrequency: String!): Income
        deleteIncome(incomeId: ID!): Income
        addExpense(expenseName: String!, expenseAmount: Int!, expenseFrequency: String!): Expense
        deleteExpense(expenseId: ID!): Expense
        editIncome(incomeId: ID!, incomeName: String!, incomeAmount: Int!, incomeFrequency: String!): Income
        editExpense(expenseId: ID!, expenseName: String!, expenseAmount: Int!, expenseFrequency: String!): Expense
    }
`;

module.exports = typeDefs;