import "./button.css"

export default function Button({ className, type = "button", variant = "default", onClick, children }) {
    return (
        <button type={type} className={`button ${className ? className : ""}`} onClick={onClick}>
            {children}
        </button>
    )
}