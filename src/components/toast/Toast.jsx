import styles from "./toast.module.css"
import { useToast } from "./toastContext"

export default function Toast() {

    const {
        toasts,
        undoToast,
        confirmToast
    } = useToast();

    return (
        <>
            {toasts.length > 0 && (
                <ul className={`${styles.toastContainer} list`}>
                    {toasts.map((toast) => (
                        <li key={toast.id} className={`
                        ${styles.toast}
                        ${!toast.visible ?
                                styles.toastHidden : ""
                            }
                    `}>
                            <div className={styles.toastMessage}>
                                {toast.type === "note" && <p className={styles.toastText}> Видалено запису: <span className={styles.toastTitle}>{toast.title}</span></p>}
                                {toast.type === "folder" && <p className={styles.toastText}> Видалено папки: <span className={styles.toastTitle}>{toast.title}</span></p>}
                                {toast.type === "taskList" && <p className={styles.toastText}> Видалено списку: <span className={styles.toastTitle}>{toast.title}</span></p>}
                            </div>

                            <div className={styles.toastControllersContainer}>
                                <button className={styles.toastController} onClick={() =>
                                    undoToast(
                                        toast.id
                                    )
                                }>
                                    <svg width="16px" height="16px">
                                        <use href="/icons/undo-icon.svg#undo-icon"> </use>
                                    </svg>
                                </button>

                                <button className={styles.toastController} onClick={() => {
                                    confirmToast(toast.id)
                                }}>
                                    <svg width="20px" height="20px">
                                        <use href="/icons/cross-icon.svg#cross-icon"></use>
                                    </svg>
                                </button>

                            </div>
                        </li>

                    ))}
                </ul>
            )}
        </>
    )
}