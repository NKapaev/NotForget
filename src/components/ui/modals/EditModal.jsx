import styles from "./modal.module.css"

import useNote from "../../../hooks/useNote"
import useUpdateNote from "../../../hooks/useUpdateNote"
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalsSlice";
import extractPreviewId from "../../../utils/extractPreviewId"

import Form from "../../form/Form";
import Button from "../button/Button";

export default function EditModal({ modalId, noteId }) {
    const { data: note } = useNote(noteId)


    const dispatch = useDispatch();
    const updateNote = useUpdateNote()


    if (!note) return null
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
                <Form onSubmit={async (formData) => {

                    const previewId = await extractPreviewId(formData.content)

                    await updateNote.mutateAsync({
                        id: noteId,
                        title: formData.title,
                        content: formData.content,
                        linkPreviewId: previewId
                    })

                    dispatch(closeModal(modalId))

                }} fields={[{ name: "title", type: "text", placeholder: "Заголовок" }, { name: "content", type: "textarea", placeholder: "Запис", listenUrl: true }]}
                    initialValues={{
                        title: note.title,
                        content: note.content
                    }}>
                    <div className="form-button-container">
                        <Button type="submit">Оновити</Button>
                    </div>
                </Form>

            </div>
        </div >
    )
}