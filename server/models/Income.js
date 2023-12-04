const { Schema, model, Types } = require('mongoose');

const incomeSchema = new Schema({
    incomeName: {
        type: String,
        required: true,
        trim: true,
    },
    incomeAmount: {
        type: Number,
        required: true,
    },
    incomeDate: {
        type: Date,
        required: true,
    },
    // incomeNote: {
    //     type: String,
    //     required: false,
    // },
    incomeUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Income = model('Income', incomeSchema);

module.exports = Income;