import styles from "./createEntityButton.module.css"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { openModal } from "../redux/modalsSlice"

export default function CreateEntityButton({ folderId = null }) {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className={styles.createEntityWrapper}>
            <button onClick={() => { setIsOpen(!isOpen) }} className={`${styles.createEntityButton} ${isOpen ? styles.isOpen : ""}`}>
                <svg className={styles.createEntityButtonIcon} width="30px" height="30px">
                    <use href="/icons/plus-icon.svg#plus" width="30px" height="30px" color="var(--blue)"></use>
                </svg>
            </button>

            <div className={`${styles.createEntityActionWrapper} ${styles.isOpen}`}>
                <button onClick={(e) => {

                    e.preventDefault()

                    const modalPayload = {
                        type: 'create', entity: "note", folderId, modalId: crypto.randomUUID()
                    }

                    dispatch(openModal(modalPayload))
                    setIsOpen(!isOpen)


                }} className={`${styles.createEntityAction} ${styles.note} ${isOpen ? styles.isOpen : ""}`}>
                    <svg width="30px" height="30px">
                        <use href="/icons/note-icon.svg#note" width="30px" height="30px" stroke="var(--blue)"></use>
                    </svg>
                </button>
                <button onClick={(e) => {
                    e.preventDefault()

                    const modalPayload = {
                        type: 'create', entity: "folder", folderId, modalId: crypto.randomUUID()
                    }

                    dispatch(openModal(modalPayload))
                    setIsOpen(!isOpen)
                }} className={`${styles.createEntityAction} ${styles.folder} ${isOpen ? styles.isOpen : ""}`}>
                    <svg width="30px" height="30px">
                        <use href="/icons/folder-icon.svg#folder"></use>
                    </svg>
                </button>

            </div>

        </div>
    )
}