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
        income: async (parent, { _id }) => {
            return Income.findOne({ _id: _id });
        },
        incomes: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Income.find(params).sort({ incomeAmount: -1 });
        },
        expense: async (parent, { _id }) => {
            return Expense.findOne({ _id: _id });
        },
        expenses: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Expense.find(params).sort({ expenseAmount: -1 });
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
        addIncome: async (parent , { incomeName, incomeAmount, incomeFrequency }, context) => {
            if (context.user) {
                const income = await Income.create({
                    incomeName,
                    incomeAmount,
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
        deleteIncome: async (parent, { incomeId }, context) => {
            if (context.user) {
                const income = await Income.findOneAndDelete({
                    _id: incomeId,
                    incomeAuthor: context.user.username,
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { incomes: incomeId } },
                    { new: true }
                );
                console.log('deleted income')
                return income;
            }
        },
        editIncome: async (parent, { incomeId, incomeName, incomeAmount, incomeFrequency }, context) => {
            if (context.user) {
                const income = await Income.findOneAndUpdate(
                    { _id: incomeId },
                    { incomeName, incomeAmount, incomeFrequency },
                    { new: true }
                );
                console.log('edited income')
                return income;
            }
        },
        // Expenses mutations
        addExpense: async (parent , { expenseName, expenseAmount, expenseFrequency }, context) => {
            if (context.user) {
                const expense = await Expense.create({
                    expenseName,
                    expenseAmount,
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
        deleteExpense: async (parent, { expenseId }, context) => {
            if (context.user) {
                const expense = await Expense.findOneAndDelete({
                    _id: expenseId,
                    expenseAuthor: context.user.username,
                });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { expenses: expenseId } },
                    { new: true }
                );
                console.log('deleted expense')
                return expense;
            }
        },
        editExpense: async (parent, { expenseId, expenseName, expenseAmount, expenseFrequency }, context) => {
            if (context.user) {
                const expense = await Expense.findOneAndUpdate(
                    { _id: expenseId },
                    { expenseName, expenseAmount, expenseFrequency },
                    { new: true }
                );
                console.log('edited expense')
                return expense;
            }
        },
    },
};

module.exports = resolvers;