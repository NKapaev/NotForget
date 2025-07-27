import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import supabase from '../../../utils/supabase'

import Header from '../../header/Header'
import logOut from '../../../utils/logout'

export default function UserProfile() {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                navigate('/error', {
                    state:
                        { code: error.code, message: "Ошибка при загрузке профиля" }
                })
                return
            }

            setProfile(data)
        }

        fetchProfile()
    }, [id, navigate])

    if (!profile) return <p>Загрузка...</p>
    return (
        <section className='profile'>

            <Header userData={profile} />



        </section >
    )
}