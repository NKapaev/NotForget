import "./header.css"

import { useNavigate, Link } from "react-router-dom"

import ThemeToggle from "../ui/themeToggle/ThemeToggle"
import logOut from "../../utils/logout"

export default function Header({ userData }) {

    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="container header-container">
                <Link className="header-logo" to={`/profile/${userData.id}`}>
                    <img src="/smallLogo.svg#smallLogo" alt="logo" width="70px" />
                </Link>

                <div className="user-container" >
                    <p onClick={(e) => {
                        e.currentTarget.classList.toggle("isOpen")
                    }} className="user-name">{userData.username}</p>
                    <button onClick={() => {
                        logOut(navigate)
                    }} className="logout-button">Logout</button>
                </div>
                <ThemeToggle />
            </div>
        </header>
    )
}