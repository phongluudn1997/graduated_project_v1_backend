const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    },
    dateTime: {
        type: Date,
        default: Date.now()
    },
    replyToComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

module.exports = mongoose.model('Comment', CommentSchema, 'Comment')