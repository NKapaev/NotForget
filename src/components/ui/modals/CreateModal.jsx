import styles from "./modal.module.css"
import useAddFolder from "../../../hooks/useAddFolder"
import useAddNote from "../../../hooks/useAddNote"
import useAddTaskList from "../../../hooks/useAddTaskList"
import Form from "../../form/Form"
import Button from "../button/Button"
import Loader from "../loader/Loader"

import supabase from "../../../utils/supabase"
import { useDispatch } from "react-redux"
import { closeModal } from "../../redux/modalsSlice"
import { useState } from "react"
import getUrlPreviewData from "../../../utils/getUrlPreviewData"
import extractPreviewId from "../../../utils/extractPreviewId"

export default function CreateModal({ entity, folderId, taskListId, modalId }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addFolder = useAddFolder()
    const addNote = useAddNote()
    const addTaskList = useAddTaskList()

    const dispatch = useDispatch();
    // const modals = useSelector((state) => state.modal.modals);

    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (entity === "folder") {
                addFolder.mutateAsync({ title: formData.title, description: formData.description })
                dispatch(closeModal(modalId))
            }
            if (entity === "note") {
                const previewId = await extractPreviewId(formData.content)

                await addNote.mutateAsync({
                    title: formData.title,
                    content: formData.content,
                    folderId,
                    taskListId,
                    linkPreviewId: previewId
                })

                dispatch(closeModal(modalId))
            }
            if (entity === "tasklist") {
                addTaskList.mutateAsync({ title: formData.title })
                dispatch(closeModal(modalId))
            }
        } catch (error) {
            console.error("Ошибка при создании:", error);
        } finally {
            setIsSubmitting(false);
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
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting ? "Створення..." : "Створити"}
                                </Button>
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
                        <Form onSubmit={handleSubmit} fields={[{ name: "title", type: "text", placeholder: "Заголовок" }, { name: "content", type: "textarea", placeholder: "Запис", listenUrl: true }]}>
                            <div className="form-button-container">
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting ? <>< Loader className={styles.addButtonLoader} /> Створення...</> : "Створити"}
                                </Button>
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
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting ? "Створення..." : "Створити"}
                                </Button>
                            </div>
                        </Form>
                    </>
                )}
            </div>
        </div>

    )
}