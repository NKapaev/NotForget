import styles from "./button.module.css"

export default function Button({ className, disabled = false, type = "button", variant = "default", onClick, children, style }) {
    return (
        <button
            type={type}
            className={`${styles.button} ${variant === "link" ? styles.link : ""} ${variant === "transparent" ? styles.transparent : ""} ${className ? className : ""}`}
            onClick={onClick}
            disabled={disabled}
            style={style}
        >
            {children}
        </button>
    )
}