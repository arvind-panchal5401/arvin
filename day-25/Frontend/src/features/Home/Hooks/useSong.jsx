import { useContext } from "react"
import { SongContext } from "../song.context"
import { getSong } from "../Services/song.api"


export const useSong = () => {
    const context = useContext(SongContext)
    
    const { song, setSong, loading, setLoading } = context
    
    async function handlegetSong({ mood }) {
        setLoading(true)
        const data = await getSong({ mood })
        setSong(data.song)
        setLoading(false)
        
    }

    return ({
        loading,song,handlegetSong
    })
}