import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import supabase from "../../utils/supabase"

export default function ConfirmEmail() {
    const navigate = useNavigate()

    useEffect(() => {
        // слушаем изменения авторизации
        const { data: subscription } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session?.user) {
                    navigate(`/profile/${session.user.id}`)
                }
            }
        )

        return () => {
            subscription.subscription.unsubscribe()
        }
    }, [navigate])

    return (
        <section className="confirm-email-section">
            <div className="container">
                <h1>Подтвердите email</h1>
                <p>
                    Мы отправили письмо с подтверждением на вашу почту. <br />
                    Пожалуйста, перейдите по ссылке в письме, чтобы активировать аккаунт.
                </p>
            </div>
        </section>
    )
}