const { Schema, model, Types } = require('mongoose');  

const expenseSchema = new Schema({
    expenseName: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 280,
        unique: true,
    },
    expenseAmount: {
        type: Number,
        required: true,
    },
    // expenseDate: {
    //     type: Date,
    //     required: true,
    // },
    expenseFrequency: {
        type: String,
        required: true,
    },
    expenseAuthor: {
        type: String,
        required: true,
        trim: true,
    }
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