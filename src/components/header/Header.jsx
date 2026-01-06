import "./header.css"

import { useNavigate, Link, useParams } from "react-router-dom"

import Button from "../ui/button/Button"
import ThemeToggle from "../ui/themeToggle/ThemeToggle"
import logOut from "../../utils/logout"

export default function Header({ userData }) {

    const navigate = useNavigate();
    const { id } = useParams()

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
                    <div className="userDropdown">
                        <Button className="userDropdownItem" onClick={() => {
                            navigate(`/profile/${id}/settings`)
                        }} >Налаштування</Button>
                        <Button className="userDropdownItem" onClick={() => {
                            logOut(navigate)
                        }} >Вийти</Button>

                    </div>

                </div>
                <ThemeToggle />
            </div>
        </header >
    )
}