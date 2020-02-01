const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    context: Object,
    objid: { type: mongoose.SchemaTypes.ObjectId, ref: 'modetitle' }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })
module.exports = mongoose.model('modeitem', schema) 