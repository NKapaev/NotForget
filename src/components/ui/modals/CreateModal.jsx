import styles from "./modal.module.css"
import useAddFolder from "../../../hooks/useAddFolder"
import useAddNote from "../../../hooks/useAddNote"
import Form from "../../form/Form"
import Button from "../button/Button"
import { useDispatch } from "react-redux"
import { closeModal } from "../../redux/modalsSlice"

export default function CreateModal({ entity, folderId, id }) {

    const addFolder = useAddFolder()
    const addNote = useAddNote()

    const dispatch = useDispatch();
    // const modals = useSelector((state) => state.modal.modals);

    const handleSubmit = (formData) => {
        if (entity === "folder") {
            addFolder.mutateAsync({ title: formData.title, description: formData.description })
            dispatch(closeModal(id))
        }
        if (entity === "note") {
            addNote.mutateAsync({ title: formData.title, content: formData.content, folderId })
            dispatch(closeModal(id))
        }
    }

    return (
        <div className={styles.modalBackdrop} onClick={() => {
            dispatch(closeModal(id))
        }}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {entity === "folder" && (
                    <>
                        <h2>Створення папки</h2>
                        <Form onSubmit={handleSubmit} fields={[{ name: "title", type: "text", placeholder: "Folder name" }, { name: "description", type: "text", placeholder: "Folder description" }]} >
                            <div className="form-button-container">
                                <Button type="submit">Створити</Button>
                            </div>
                        </Form>
                    </>
                )}
                {entity === "note" && (
                    <>
                        <h2>Створення нотатки</h2>
                        <Form onSubmit={handleSubmit} fields={[{ name: "title", type: "text", placeholder: "Enter title" }, { name: "content", type: "text", placeholder: "Enter note" }]}>
                            <div className="form-button-container">
                                <Button type="submit">Створити</Button>
                            </div>
                        </Form>
                    </>
                )}
            </div>
        </div>

    )
}