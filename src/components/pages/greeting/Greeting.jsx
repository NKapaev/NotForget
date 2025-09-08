import ThemeToggle from "../../ui/themeToggle/ThemeToggle"
import supabase from '../../../utils/supabase'
import { useAuth } from "../../../hooks/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import Form from "../../form/Form"
import "./greeting.css"

export default function Greeting() {
    const navigate = useNavigate()
    const { signIn, error } = useAuth()
    const userHeight = window.innerHeight

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            if (data.session) {
                navigate(`/profile/${data.session.user.id}`)
            }
        }

        checkSession()

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                navigate(`/profile/${session.user.id}`)
            }
        })

        return () => {
            authListener.subscription.unsubscribe()
        }
    }, [navigate])

    const handleLogin = async (formData) => {
        try {
            const user = await signIn(formData.email, formData.password)
            navigate(`/profile/${user.id}`)
        } catch (_) {
            // error уже есть в useAuth
        }
    }

    return (
        <section className="greeting-section"
            style={{ minHeight: userHeight, paddingTop: userHeight < 470 ? "60px" : '' }}>
            <div className="container greeting-container">
                <ThemeToggle className="greeting-theme-toggle" />
                <div className="greeting-hero-column greeting-content">
                    <svg className="greeting-logo" href="./logo.svg#logo">
                        <use className="greeting-logo" href="./logo.svg#logo"></use>
                    </svg>
                    <p className="greeting-text">
                        NotForget
                    </p>
                </div>
                <div className="greeting-hero-column greeting-hero-form">
                    <div className="greeting-form">
                        <Form
                            className="login-form"
                            buttonText="Увійти"
                            onSubmit={handleLogin}
                            fields={[
                                { name: "email", type: "email", placeholder: "Email" },
                                { name: "password", type: "password", placeholder: "Пароль" }
                            ]}
                        >
                            <Link className="forget-password link">Забули пароль?</Link>
                        </Form>
                        <div className="registration-part-separator">або</div>
                        <Link className="registration-link link" to={'/registration'}>Зареєструватись</Link>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
            </div>
        </section >
    )
}