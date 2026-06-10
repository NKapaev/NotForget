import styles from "./errorPage.module.css"
import { useLocation, useNavigate } from 'react-router-dom'

import Button from "../../components/ui/button/Button"

export default function ErrorPage() {

    const navigate = useNavigate()
    const location = useLocation()
    const error = location.state || {}

    return (
        <section className={styles.errorSection}>
            <div className={styles.iconWrapper}>
                <svg className={styles.brainIcon} width='100px' height="100px">
                    <use href="/smallLogo.svg#smallLogo" width="100px" height="100px" fill="#313ab1"></use>
                </svg>
                <svg className={styles.warningIcon}>
                    <use href="/icons/warning.svg" width={"55px"} height={"55px"}></use>
                </svg>
            </div>
            <p className={styles.errorMessage}>{error.message}</p>
            <Button onClick={() => {
                navigate("/")
            }}>На головну</Button>
        </section>
    )
}