const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    context: Object,
    index:Number
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })
module.exports = mongoose.model('Note', schema)