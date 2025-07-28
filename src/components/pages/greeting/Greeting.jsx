import ThemeToggle from "../../ui/themeToggle/ThemeToggle"
import LoginForm from "../../loginForm/LoginForm"
import "./greeting.css"


export default function Greeting() {

    const userHeight = window.innerHeight

    return (
        <section className="greeting-section" style={{ height: userHeight }}>
            <div className="container greeting-container">
                <ThemeToggle className="greeting-theme-toggle"></ThemeToggle>

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
            </div>
        </section >
    )
}