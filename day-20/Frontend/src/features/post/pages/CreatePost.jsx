import React from 'react'
import '../style/createpost.scss'
import { useState } from 'react'
import { useRef } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePage = () => {
  const navigate = useNavigate()
  const [caption, setCaption] = useState('')
  const postImageInputRef = useRef()

  const {loading,handlecreatePost} = usePost()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const file = postImageInputRef.current.files[0]
    await handlecreatePost(file, caption)
    navigate('/')
  }

  if (loading) {
    return <main>
      <h1>Creating a post</h1>
    </main>
  }

  return (
    <main className='createPost-page'>
      <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
          <label className='post-lable'  htmlFor="postImage">Select a File</label>
          <input ref={postImageInputRef} hidden type="file" name='postImage' id='postImage' />
          <input 
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value)
            }}
            type="text"
            name='caption' id='caption'
            placeholder='Enter Caption' />
          <button className='button primary-button'>Add Post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePage