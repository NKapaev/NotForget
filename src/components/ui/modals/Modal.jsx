import styles from "./modal.module.css"

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalsSlice";

import ViewModal from "./ViewModal"
import EditModal from "./EditModal"
import CreateModal from "./CreateModal"
// import ConfirmModal from "./ConfirmModal"

export default function Modal({ modal }) {

    const dispatch = useDispatch();
    const [isClosing, setIsClosing] = useState(false);
    const clickTargetRef = useRef(null);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(closeModal(modal.modalId));
        }, 300); // время должно совпадать с CSS анимацией
    };

    const props = { ...modal, isClosing, onClose: handleClose }

    return (
        <div className={`${styles.modalBackdrop} ${isClosing ? styles.isClosing : ""}`}

            onClick={(e) => {
                if (e.target === e.currentTarget && clickTargetRef.current === e.currentTarget) {
                    setIsClosing(true);
                    setTimeout(() => {
                        dispatch(closeModal(modal.modalId));
                    }, 300);
                }
            }}

            onMouseDown={(e) => {
                clickTargetRef.current = e.target;
            }}>

            {modal.type === "view" && <ViewModal className={styles.modalBackdrop} {...props} />}
            {modal.type === "edit" && <EditModal className={styles.modalBackdrop} {...props} />}
            {modal.type === "create" && <CreateModal className={styles.modalBackdrop} {...props} />}
            {modal.type === "confirm" && <ConfirmModal className={styles.modalBackdrop} {...props} />}
        </div>
    )
}