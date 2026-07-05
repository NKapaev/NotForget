import styles from "./entityList.module.css"
import { useSelector } from "react-redux"


export default function EntityList({ reduced, children }) {

    return (
        <div className={`${styles.entiyList} ${reduced ? styles.reduced : ""}`}>
            {children}
        </div>
    )
}