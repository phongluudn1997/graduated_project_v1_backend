const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    namePermission: String
})

module.exports = mongoose.model('Permission', PermissionSchema, 'Permission')
