import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { getMe, login, logout, register } from "../services/auth.api"


export const useAuth = () => {
    const context = useContext(AuthContext)

    const { user, setUser, loading, setLoading } = context

    const handleRegister = async ({username,email,password}) => {
        setLoading(true)

        const data = await register({ username, email, password })
        setUser(data.user)

        setLoading(false)
    }

    const handleLogin = async({ username, email, password }) => {
        setLoading(false)
        const data = await login({ username, email, password })
        setUser(data.user)

        setLoading(false)
    }
    const handleGetme = async () => {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }
    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(data.user)
        setLoading(false)
    }
    useEffect(() => {
        handleGetme()
    },[])

    return ({
        user, loading, handleRegister, handleLogin,handleGetme,handleLogout
    })
}