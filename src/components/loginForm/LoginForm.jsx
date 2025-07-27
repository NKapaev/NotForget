import "./loginForm.css"

import InputField from "../ui/inputField/InputField"
import Button from "../ui/button/Button"
import Error from "../ui/error/Error"

import supabase from '../../utils/supabase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
            alert('Ошибка входа: ' + error.message)
        } else {
            const user = data.user
            console.log(user)


            // После успешного входа проверим/создадим профиль
            await ensureProfileExists(user)

            // Перенаправим на /profile/:id
            navigate(`/profile/${user.id}`)
        }
    }

    // 👇 Проверяем, есть ли профиль — если нет, создаём
    const ensureProfileExists = async (user) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (!data) {
            setError("Пользователь не найден")


            //  👤 Профиль не существует — создаём
            await supabase.from('profiles').insert({
                id: user.id,
                username: user.email.split('@')[0] // простой username по умолчанию
            })

        }
    }

    return (
        <form onSubmit={handleLogin} className="loginForm">
            <InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
            {error ? <Error errorText={error} /> : ""}
            <Button type="submit">Войти</Button>
        </form>
    )
}