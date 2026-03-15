import styles from "./entityList.module.css"


export default function EntityList({ children }) {

    return (
        <div className={styles.entiyList}>
            {children}
        </div>
    )
}