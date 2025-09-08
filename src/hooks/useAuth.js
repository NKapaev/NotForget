// hooks/useAuth.js
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
            // await ensureProfileExists(user)
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
                    emailRedirectTo: `${window.location.origin}`, // полный URL
                },
            })
            console.log(window.location.origin)

            if (error) throw error

            // если подтверждение включено — user может быть null
            return data
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // const ensureProfileExists = async (user) => {
    //     const { data } = await supabase
    //         .from("profiles")
    //         .select("*")
    //         .eq("id", user.id)
    //         .single()

    //     if (!data) {
    //         await supabase.from("profiles").insert({
    //             id: user.id,
    //             username: user.email.split("@")[0],
    //         })
    //     }
    // }

    return { signIn, signUpNewUser, error, loading }
}