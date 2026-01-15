import ThemeToggle from "../../components/ui/themeToggle/ThemeToggle"
import supabase from '../../utils/supabase'
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import translateError from "../../utils/translateError"

import Button from "../../components/ui/button/Button"
import Form from "../../components/form/Form"
import "./greeting.css"

export default function Greeting() {
    const navigate = useNavigate()
    const { signIn, error } = useAuth()
    const userHeight = window.innerHeight
    const [emailSent, setEmailSent] = useState(false)
    const [formType, setFormType] = useState("login")

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
                    {formType === "login" && <div className="greeting-form">
                        <h2>Вхід</h2>
                        <Form
                            validate={false}
                            className="login-form"
                            onSubmit={handleLogin}
                            fields={[
                                { name: "email", type: "email", placeholder: "Email" },
                                { name: "password", type: "password", placeholder: "Пароль" }
                            ]}
                        >
                            <div className="form-button-container">
                                <div className="greeting-form-error">{error && <p>{translateError(error)}</p>}</div>
                                <Button className="form-button" type="submit">Увійти</Button>
                                <Button variant="link" onClick={() => {
                                    setFormType("resetPassword")
                                }} className="forget-password link">Забули пароль?</Button>
                            </div>
                        </Form>
                        <div className="registration-part-separator">або</div>
                        <Link className="registration-link link" to={'/registration'}>Зареєструватись</Link>
                    </div>}


                    {formType === "resetPassword" &&
                        <div className="greeting-form">
                            <h2>Відновлення пароля</h2>

                            {!emailSent ? (<Form validate="true" onSubmit={async ({ email }) => {
                                let { error } = await supabase.auth.resetPasswordForEmail(email)

                                setEmailSent(true)

                                if (error) {
                                    console.log(error)
                                }
                            }

                            } fields={[{ type: "email", name: "email", placeholder: "Email" }]} >

                                <div className="form-button-container">
                                    <Button className="form-button" type="submit">Відновити</Button>
                                    <Button className="form-button" onClick={() => {
                                        setFormType("login")
                                    }}>Повернутись</Button>
                                </div>
                            </Form>) : (<div className="reset-password-success">
                                <p className="reset-password-message">
                                    Якщо акаунт з таким email існує,<br />
                                    ми надіслали лист для відновлення пароля.
                                </p>

                                <Button
                                    className="form-button"
                                    onClick={() => {
                                        setEmailSent(false)
                                        setFormType("login")
                                    }}
                                >
                                    На головну
                                </Button>
                            </div>)}


                        </div>
                    }
                </div>
            </div>
        </section >
    )
}