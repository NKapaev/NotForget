import styles from "./modal.module.css"
import useAddFolder from "../../../hooks/useAddFolder"
import useAddNote from "../../../hooks/useAddNote"
import useAddTaskList from "../../../hooks/useAddTaskList"
import Form from "../../form/Form"
import Button from "../button/Button"
import { useDispatch } from "react-redux"
import { closeModal } from "../../redux/modalsSlice"
import parseUrl from "../../../utils/parseUrl"

export default function CreateModal({ entity, folderId, taskListId, modalId }) {

    const addFolder = useAddFolder()
    const addNote = useAddNote()
    const addTaskList = useAddTaskList()

    const dispatch = useDispatch();
    // const modals = useSelector((state) => state.modal.modals);

    const handleSubmit = (formData) => {
        if (entity === "folder") {
            addFolder.mutateAsync({ title: formData.title, description: formData.description })
            dispatch(closeModal(modalId))
        }
        if (entity === "note") {

            parseUrl(formData.content)
            addNote.mutateAsync({ title: formData.title, content: formData.content, folderId, taskListId })
            dispatch(closeModal(modalId))

        }
        if (entity === "tasklist") {
            addTaskList.mutateAsync({ title: formData.title })
            dispatch(closeModal(modalId))
        }
    }

    return (
        <div className={styles.modalBackdrop} onClick={() => {
            dispatch(closeModal(modalId))
        }}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {entity === "folder" && (
                    <>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Створення папки</h2>
                            <div className={styles.buttonsContainer}>
                                <Button className={styles.modalControlButton} onClick={() => { dispatch(closeModal(modalId)) }} style={{ padding: 0 }}>
                                    <img width="15px" src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                                </Button>
                            </div>
                        </div>

                        <Form onSubmit={handleSubmit} fields={[{ name: "title", type: "text", placeholder: "Назва" }, { name: "description", type: "text", placeholder: "Опис" }]} >
                            <div className="form-button-container">
                                <Button type="submit">Створити</Button>
                            </div>
                        </Form>
                    </>
                )}
                {entity === "note" && (
                    <>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Створення нотатки</h2>
                            <div className={styles.buttonsContainer}>
                                <Button className={styles.modalControlButton} onClick={() => { dispatch(closeModal(modalId)) }} style={{ padding: 0 }}>
                                    <img width="15px" src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                                </Button>
                            </div>

                        </div>
                        <Form onSubmit={handleSubmit} fields={[{ name: "title", type: "text", placeholder: "Заголовок" }, { name: "content", type: "text", placeholder: "Запис", listenUrl: true }]}>
                            <div className="form-button-container">
                                <Button type="submit">Створити</Button>
                            </div>
                        </Form>
                    </>
                )}
                {entity === "tasklist" && (
                    <>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>Створення списку задач</h2>
                            <div className={styles.buttonsContainer}>
                                <Button className={styles.modalControlButton} onClick={() => { dispatch(closeModal(modalId)) }} style={{ padding: 0 }}>
                                    <img width="15px" src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                                </Button>
                            </div>

                        </div>
                        <Form onSubmit={handleSubmit} fields={[{ name: "title", type: "text", placeholder: "Назва списку задач" }]}>
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