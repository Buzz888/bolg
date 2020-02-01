const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    context: String,
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })
module.exports = mongoose.model('algtitle', schema)