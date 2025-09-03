import ThemeToggle from "../../ui/themeToggle/ThemeToggle"
import { useAuth } from "../../../hooks/useAuth"
import supabase from '../../../utils/supabase'
import "./greeting.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Form from "../../form/Form"
import { Link } from "react-router-dom"

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
        <section className="greeting-section" style={{ height: userHeight }}>
            <div className="container greeting-container">
                <ThemeToggle className="greeting-theme-toggle" />

                <div className="greeting-hero">
                    <div className="greeting-hero-column greeting-content">
                        <svg className="svg" href="./logo.svg#logo" width="300px" height="300px">
                            <use className="use" href="./logo.svg#logo" width="300px" height="300px"></use>
                        </svg>
                        <p>
                            Пам’ять може підвести. Ми — ніколи. <br />
                            Запиши, прикріпи, збережи — й забудь... аж поки не знадобиться. <br />
                            Твої думки в безпеці.
                        </p>
                    </div>
                    <div className="greeting-hero-column ">
                        <div className="greeting-form">
                            <Form
                                className="login-form"
                                title="Вход"
                                buttonText="Login"
                                onSubmit={handleLogin}
                                fields={[
                                    { name: "email", type: "email", placeholder: "Email" },
                                    { name: "password", type: "password", placeholder: "Пароль" }
                                ]}
                            >
                                <Link className="forget-password link">Forget password?</Link>


                            </Form>
                            <div className="registration-part">
                                <Link className="registration-link link" to={'/registration'}>Зареєструватись</Link>
                            </div>
                        </div>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                    </div>
                </div>
            </div>
        </section>
    )
}