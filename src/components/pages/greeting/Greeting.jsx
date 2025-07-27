import ThemeToggle from "../../ui/themeToggle/ThemeToggle"
import LoginForm from "../../loginForm/LoginForm"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import logOut from "../../../utils/logout"
import "./greeting.css"


export default function Greeting() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()



    return (
        <section className="greeting-section">
            <div className="container">
                <ThemeToggle></ThemeToggle>

                <div className="greeting-hero">
                    <div className="greeting-hero-column greeting-content">
                        <svg className="svg" href="./logo.svg#logo" width="300px" height="300px">
                            <use className="use" href="./logo.svg#logo" width="300px" height="300px"></use>
                        </svg>
                        <p>Пам’ять може підвести. Ми — ніколи. <br />
                            Запиши, прикріпи, збережи — й забудь... аж поки не знадобиться. <br />
                            Твої думки в безпеці.</p>
                    </div>
                    <div className="greeting-hero-column greeting-login">
                        <LoginForm />
                    </div>
                </div>

                <Link to="/registration">Зарегистрироваться</Link>
                <button onClick={() => logOut(navigate)}>Logout</button>
            </div>
        </section>
    )
}