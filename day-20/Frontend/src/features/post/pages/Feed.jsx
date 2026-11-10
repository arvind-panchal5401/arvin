import React, { useEffect } from 'react'
import '../style/feed.scss'
import { usePost } from '../hooks/usePost'
import Post from '../components/Post'



const Feed = () => {
    const { loading, feed, handleGetFeed } = usePost()
    
    useEffect(() => {
        handleGetFeed()
    }, [])
    
    if (loading || !feed) {
        return (
            <main>
                <h1>Feed is Loading...</h1>
            </main>
        )
    }
    
    
    
    


    return (
        <main className='feeds'>
            <div className="feed">
                <div className="posts">
                    {feed.map(post => {
                        return  <Post  user ={post.user} post ={post} />
                        
                    })}
                    
                </div>
            </div>
        </main>
    )
}

export default Feed