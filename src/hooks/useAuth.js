import { useState } from "react"
import supabase from "../utils/supabase"
import { useNavigate } from "react-router-dom"

export function useAuth() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const signIn = async (email, password) => {
        setLoading(true)
        setError(null)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) throw error

            const user = data.user
            return user
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const signUpNewUser = async (email, password) => {
        setLoading(true)
        setError(null)
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    // emailRedirectTo: `${window.location.origin}`,
                },
            })

            if (error) {
                setError(error.message)
                throw error
            }

            // КЛЮЧЕВАЯ ПРОВЕРКА: если identities пустой - пользователь уже существует
            if (data.user && data.user.identities && data.user.identities.length === 0) {
                const duplicateError = "Користувач з таким email вже зареєстрований"
                setError(duplicateError)
                throw new Error(duplicateError)
            }

            return data
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { signIn, signUpNewUser, error, loading }
}