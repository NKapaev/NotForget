import "./button.css"

export default function Button({ className, type = "button", onClick, children }) {
    return (
        <button type={type} className={`button ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}