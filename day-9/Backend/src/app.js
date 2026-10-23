const express = require('express')

const newModel = require('./models/notes.models')

const app = express()

app.use(express.json())


app.post('/notes', async (req, res) => {
    const { title, description } = req.body
    const note = await newModel.create({
        title, description
    })


    res.status(201).json({
        message: 'Notes is created sucessfully',
        note
    })
})


app.get('/notes', async (req, res) => {
    const note = await newModel.find()

    res.status(200).json({
        message: 'Notes Featching Sucessfully',
        note
    })
})


app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id
    await newModel.findByIdAndDelete(id)
    res.status(200).json({
        message: 'Notes deleted  sucessfully'
    })

})


app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id
    const {description} = req.body  
    await newModel.findByIdAndUpdate(id, { description })
    
    res.status(200).json({
        message:"Note updated sucessfully"
    })
})
module.exports = app