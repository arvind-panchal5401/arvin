const express = require('express')

const app = express()

app.use(express.json())

const note = []

app.post('/notes', (req, res) => {

    console.log(req.body);

    note.push(req.body)

    res.send('notes is created')
})

app.get('/notes', (req, res) => {
    res.send(note)
})

app.delete('/notes/:index', (req, res) => {
    delete note[req.params.index]

    res.send('notes is sucessfully deleted')

})

app.patch('/notes/:index', (req, res) => {
    note[req.params.index].description = req.body.description
    res.send('notes is sucessfully updated')
})

module.exports = app