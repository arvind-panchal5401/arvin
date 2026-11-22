import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhsot:3000',
    withCredentials:true
})

export const getSong =async ({ mood }) => {
    const response = await api.get('/api/songs?mood=' + mood)
    return response.data
}