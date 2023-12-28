const { Schema, model, Types } = require('mongoose');
// do i need to add anything else for this model?

const incomeSchema = new Schema({
    incomeName: {
        type: String,
        required: true,
        trim: true,
        min: 1,
        max: 280,
        unique: true,
    },
    incomeAmount: {
        type: Number,
        required: true,
        trim: true,
    },
    // incomeDate: {
    //     type: Date,
    //     required: true,
    // },
    incomeFrequency: {
        type: String,
        required: true,
    },
    incomeAuthor: {
        type: String,
        required: true,
        trim: true,
    }
    // incomeNote: {
    //     type: String,
    //     required: false,
    // },
    // Do i need this? ------------------------
    // incomeUser: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
});

const Income = model('Income', incomeSchema);

module.exports = Income;