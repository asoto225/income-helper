const { Schema, model, Types } = require('mongoose');  

const expenseSchema = new Schema({
    expenseName: {
        type: String,
        required: true,
        trim: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    expenseDate: {
        type: Date,
        required: true,
    },
    expenseFrequency: {
        type: String,
        required: true,
    },
    // expenseNote: {
    //     type: String,
    //     required: false,
    // },
    // Do i need this? ------------------------
    // expenseUser: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
});

const Expense = model('Expense', expenseSchema);

module.exports = Expense;