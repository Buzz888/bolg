const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    context: Object,
    objid:{type:mongoose.SchemaTypes.ObjectId,ref:'webtitle'}
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })
module.exports = mongoose.model('webitem', schema)