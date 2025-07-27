import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../../utils/supabase'

export default function EmailConfirmed() {
    const navigate = useNavigate()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (user) {
                navigate(`/profile/${user.id}`)
            } else {
                console.error('User not found', error)
            }
        }

        getUser()
    }, [])

    return <p>Проверяем ваш аккаунт...</p>
}