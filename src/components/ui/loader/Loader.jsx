import styles from "./loader.module.css"

export default function Loader({ variant }) {
    return (
        <div className={` ${variant === "big" ? styles.big : styles.loader}`}>
            <svg className={styles.loaderIcon}>
                <use href="/icons/loader.svg"></use>
            </svg>
        </div>
    )
}