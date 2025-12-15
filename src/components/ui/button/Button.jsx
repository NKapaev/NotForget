import styles from "./button.module.css"

export default function Button({ className, type = "button", variant = "default", onClick, children, style }) {
    return (
        <button
            type={type}
            className={`${styles.button} ${className ? className : ""}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    )
}