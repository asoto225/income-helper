const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Income {
        _id: ID
        incomeName: String
        incomeAmount: Int
        incomeDate: String
        incomeUser: String
    }

    type Expense {
        _id: ID
        expenseName: String
        expenseAmount: Int
        expenseDate: String
        expenseUser: String
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
        addIncome(incomeName: String!, incomeAmount: Int!, incomeDate: String!): Income
        addExpense(expenseName: String!, expenseAmount: Int!, expenseDate: String!): Expense
    }
`;