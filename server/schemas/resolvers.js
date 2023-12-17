const { User, Income, Expense } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('incomes').populate('expenses');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('incomes').populate('expenses');
        },
        income: async (parent, { incomeId }) => {
            return Income.findOne({ _id: incomeId });
        },
        incomes: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Income.find(params).sort({ incomeDate: -1 });
        },
        expense: async (parent, { expenseId }) => {
            return Expense.findOne({ _id: expenseId });
        },
        expenses: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Expense.find(params).sort({ expenseDate: -1 });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('incomes').populate('expenses');
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
        // User mutations
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            console.log(token);
            console.log(user);
            return { token, user };
        },
        // Income mutations
        addIncome: async (parent , { incomeName, incomeAmount, incomeDate, incomeFrequency }, context) => {
            if (context.user) {
                const income = await Income.create({
                    incomeName,
                    incomeAmount,
                    incomeDate,
                    incomeFrequency,
                    incomeAuthor: context.user.username,
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { incomes: income} },
                    { new: true }
                );
                console.log(income);
                return {
                    incomes: income,
                };
            };
        },
        // Expenses mutations
        addExpense: async (parent , { expenseName, expenseAmount, expenseDate, expenseFrequency }, context) => {
            if (context.user) {
                const expense = await Expense.create({
                    expenseName,
                    expenseAmount,
                    expenseDate,
                    expenseFrequency,
                    expenseAuthor: context.user.username,
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { expenses: expense} },
                    { new: true }
                );
                console.log(expense);
                return {
                    expenses: expense,
                };
            }
        },
    },
};

module.exports = resolvers;