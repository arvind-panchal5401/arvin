const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
    title: String,
    description:String,
})

const newModels = mongoose.model('notes', newSchema)

module.exports =newModels