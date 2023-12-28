const mongoose = require('mongoose');
const db = require('../config/connection');
const { User, Income, Expense } = require('../models');

db.once('open', async () => {
    try {
        await Income.deleteMany({});
        await Expense.deleteMany({});
        await User.deleteMany({});
        console.log('seeded!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});