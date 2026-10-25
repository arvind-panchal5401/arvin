import React, { useEffect, useState } from 'react'

import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([
  ])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [modifyId, setModifyId] = useState([])
  function featchData() {
    axios.get('http://localhost:3000/notes')
      .then((res) => {
        setNotes(res.data.note)
      })
  }

  useEffect(() => {
    featchData()
  }, [])

  function submitHandler(e) {
    e.preventDefault()
    if (modifyId) {
      axios.patch(`http://localhost:3000/notes/${modifyId}`, {
        title: title,
        description: description
      }).then((res) => {
        console.log(res.data)
        setModifyId(null)
        setTitle('')
        setDescription('')
        featchData()
      })
    }
    else
      axios.post(`http://localhost:3000/notes`, {
        title: title,
        description: description
      }).then(res => {
        console.log(res.data);
        setTitle('')
        setDescription('')
        featchData()

      })


  }

  function delectHandler(noteId) {
    axios.delete(`http://localhost:3000/notes/${noteId}`)
      .then((res) => {
        console.log(res.data);
        featchData()

      })
  }

  function modifiyNote(Id) {
    const note = notes.find(note => note._id == Id)
    if (note) {
      setTitle(note.title)
      setDescription(note.description)
      setModifyId(Id)
    }
  }

  return (

    <>
      <form
        onSubmit={submitHandler}>
        <input
          value={title}

          onChange={(e) => {
            setTitle(e.target.value)
          }}
          name='title'
          type="text"
          placeholder='Enter title' />
        <input
          value={description}

          onChange={(e) => {
            setDescription(e.target.value)
          }}
          name='description'
          type="text"
          placeholder='Enter description' />
        <button type="submit">
          {modifyId ? 'Update Note' : 'Submit Notes'}
        </button>
      </form>

      <div className="notes">
        {
          notes.map((note, idx) => {
            return <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button id='modifiy-note' onClick={() => {
                modifiyNote(note._id)
              }}>Modifiy Note</button>
              <button id='delete-btn' onClick={() => { delectHandler(note._id) }}>Delete</button>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App