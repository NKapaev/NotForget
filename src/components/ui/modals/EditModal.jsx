import styles from "./modal.module.css"

import useAddNote from "../../../hooks/useAddNote";
import useUpdateNote from "../../../hooks/useUpdateNote"
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalsSlice";

import Form from "../../form/Form";
import Button from "../button/Button";

export default function EditModal({ props: { content, title }, modalId, noteId }) {

    const dispatch = useDispatch();
    const updateNote = useUpdateNote()


    return (
        <div className={styles.modalBackdrop} onClick={() => { dispatch(closeModal(modalId)) }}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.buttonsContainer} style={{ marginLeft: "auto" }}>
                        <Button className={styles.modalControlButton} onClick={() => { dispatch(closeModal(modalId)) }} style={{ padding: 0 }}>
                            <img width="15px" src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                        </Button>
                    </div>

                </div>
                <Form onSubmit={(formData) => {
                    updateNote.mutateAsync({ id: noteId, ...formData })
                    dispatch(closeModal(modalId))
                }} fields={[{ name: "title", type: "text", placeholder: "Заголовок" }, { name: "content", type: "textarea", placeholder: "Запис" }]}
                    initialValues={{
                        title,
                        content
                    }}>
                    <div className="form-button-container">
                        <Button type="submit">Оновити</Button>
                    </div>
                </Form>

            </div>
        </div >
    )
}