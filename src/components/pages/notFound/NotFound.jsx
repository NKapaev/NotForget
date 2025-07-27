import "./notFound.css"
import { useLocation } from 'react-router-dom'

export default function NotFound() {

    const location = useLocation()
    const error = location.state || {}

    return (
        <>
            <svg width='100px' height="100px">
                <use href="./smallLogo.svg#smallLogo" width="100px" height="100px" fill="#313ab1"></use>
            </svg>
            <p className="error-code">{error.code}</p>
            <p>{error.message}</p>

        </>
    )
}