import "./header.css"

import { useNavigate, Link } from "react-router-dom"

import Button from "../ui/button/Button"
import ThemeToggle from "../ui/themeToggle/ThemeToggle"
import logOut from "../../utils/logout"

export default function Header({ userData }) {

    const navigate = useNavigate();
    return (
        <header className="header">
            <div className="container header-container">
                <Link className="header-logo" to={`/profile/${userData.id}`} width="70px">
                    <img src="/smallLogo.svg#smallLogo" alt="logo" width="70px" />
                </Link>

                <div className="user-container" >
                    <p onClick={(e) => {
                        e.currentTarget.classList.toggle("isOpen")
                    }} className="user-name">{userData.username}</p>
                    <Button className="logout-button" onClick={() => {
                        logOut(navigate)
                    }} >Logout</Button>
                </div>
                <ThemeToggle />
            </div>
        </header >
    )
}