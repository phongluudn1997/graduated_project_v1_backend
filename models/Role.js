const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    nameRole: {
        type: String,
        enum: ['Admin', 'Mod', 'Student']
    }
})

module.exports = mongoose.model('Role', RoleSchema, 'Role');