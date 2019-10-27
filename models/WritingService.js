const mongoose = require('mongoose');

const WritingServiceSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    postedAt: {
        type: Date,
        default: Date.now()
    },
    question: {
        type: String
    },
    body: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Done', 'Cancel']
    },
    checkedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    checkedAt: {
        type: Date
    },
    responsePost: {
        type: String
    }
})

module.exports = mongoose.model('WritingService', WritingServiceSchema, 'WritingService')