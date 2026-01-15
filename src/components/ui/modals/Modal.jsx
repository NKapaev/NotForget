import styles from "./modal.module.css"

import ViewModal from "./ViewModal"
import EditModal from "./EditModal"
import CreateModal from "./CreateModal"
// import ConfirmModal from "./ConfirmModal"

export default function Modal({ modal }) {

    switch (modal.type) {
        case 'view':
            return <ViewModal className={styles.modalBackdrop} {...modal}></ViewModal>
        case 'edit':
            return <EditModal className={styles.modalBackdrop} {...modal}></EditModal>
        case 'create':
            return <CreateModal className={styles.modalBackdrop} {...modal}></CreateModal>
        case 'confirm':
            return <ConfirmModal className={styles.modalBackdrop}>{...modal}</ConfirmModal>
    }
}