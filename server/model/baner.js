const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: String,
    url: String,
})
module.exports = mongoose.model('baner', schema)