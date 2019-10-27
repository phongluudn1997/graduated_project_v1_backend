const mongoose = require('mongoose');

const RvsPSchema = mongoose.Schema({
    _idRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    _idPermission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }
})

module.exports = mongoose.model('RoleVsPer', RvsPSchema, 'RoleVsPer')