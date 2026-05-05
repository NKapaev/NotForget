import { useEffect } from "react"
import styles from "./findModeButton.module.css"

export default function FindModeButton({ currentMode, onToggle, visible }) {

    return (
        <button type="button" onClick={onToggle} className={`${styles.findModeButton} ${visible ? styles.visible : ""}`}>
            <svg className={`${styles.findModeIcon} ${currentMode === "all" ? styles.active : ""}`} width="20px" height="20px" fill="var(--blue)" stroke="var(--blue)">
                <use width="20px" height="20px" href="/icons/layer-icon.svg#layer-icon"></use>
            </svg>
            <svg className={`${styles.findModeIcon} ${currentMode === "folder" ? styles.active : ""}`} width="20px" height="20px" fill="var(--blue)" stroke="var(--blue)">
                <use width="20px" height="20px" href="/icons/layers-icon.svg#layers-icon"></use>
            </svg>
        </button>
    )
}