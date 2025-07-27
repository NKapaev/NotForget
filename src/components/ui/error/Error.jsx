import "./error.css"

export default function Error({ errorText }) {
    return (
        <p className="error">{errorText}</p>
    )
}