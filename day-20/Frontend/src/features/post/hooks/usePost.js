import { useContext } from "react"
import { PostContext } from "../post.context"
import { createPost, getFeed, likePost, UnlikedPost } from "../services/post.api";
import { useEffect } from "react";


export const usePost = () => {
    const context = useContext(PostContext)

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    const handleGetFeed = async () => {

        setLoading(true)
        const data = await getFeed()

        setFeed(data.posts.reverse())

        setLoading(false)

    }
    const handlecreatePost = async (imageFile,caption) => {
        setLoading(true)
        const data = await createPost(imageFile, caption)
        setFeed([data.post, ...feed])
        
        setLoading(false)

        
    }

    const handlelikePost = async (post) => {
        
        const data = await likePost(post)
        await handleGetFeed()

    }
    const handleUnlikedPost = async (post) => {
        
        const data = await UnlikedPost(post)
        await handleGetFeed()

    }

  
    return {
        loading, post, feed, handleGetFeed ,handlecreatePost,handlelikePost,handleUnlikedPost

    }
}