const { User, Income, Expense } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, { username}, context) => {
            return User.findOne({ username }).populate('income').populate('expense');

        },
        income: async (parent, {username}) => {
            const params = username ? { username } : {};
            return Income.find(params).sort({ incomeDate: -1 });
        },
        expense: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Expense.find(params).sort({ expenseDate: -1 });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('income').populate('expense');
            }
            throw AuthenticationError;
        },
    },
    Mutation: {
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
        addIncome: async (parent , { incomeName, incomeAmount, incomeDate, incomeFrequency }, context) => {
            if (context.user) {
                const income = await Income.create({
                    incomeName,
                    incomeAmount,
                    incomeDate,
                    incomeFrequency,
                    incomeUser: context.user._id,
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { income: income} },
                    { new: true }
                );
                console.log(income);
                return {
                    income: income,
                };
            };
        },
        addExpense: async (parent , { expenseName, expenseAmount, expenseDate, expenseFrequency }, context) => {
            if (context.user) {
                const expense = await Expense.create({
                    expenseName,
                    expenseAmount,
                    expenseDate,
                    expenseFrequency,
                    expenseUser: context.user._id,
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { expense: expense} },
                    { new: true }
                );
                console.log(expense);
                return {
                    expense: expense,
                };
            }
        },
    },
};