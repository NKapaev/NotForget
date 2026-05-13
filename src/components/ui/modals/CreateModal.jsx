import styles from "./modal.module.css"
import useAddFolder from "../../../hooks/useAddFolder"
import useAddNote from "../../../hooks/useAddNote"
import useAddTaskList from "../../../hooks/useAddTaskList"
import Form from "../../form/Form"
import Button from "../button/Button"
import Loader from "../loader/Loader"

import { useQueryClient } from "@tanstack/react-query"

import supabase from "../../../utils/supabase"
import { useState } from "react"
import extractPreviewId from "../../../utils/extractPreviewId"

export default function CreateModal({ entity, folderId = null, taskListId = null, modalId, isClosing, closeModal }) {
    const queryClient = useQueryClient();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const addFolder = useAddFolder(folderId)
    const addNote = useAddNote()
    const addTaskList = useAddTaskList()


    const handleSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            if (entity === "folder") {
                addFolder.mutateAsync({ title: formData.title, description: formData.description, folderId: folderId ?? null })
                closeModal()
            }
            if (entity === "note") {
                const newNote = await addNote.mutateAsync({
                    title: formData.title,
                    content: formData.content,
                    folderId: folderId,
                    taskListId: taskListId,
                    linkPreviewId: null
                })

                closeModal()
                extractPreviewId(formData.content)
                    .then(async (previewId) => {
                        if (previewId && newNote?.id) {
                            await supabase
                                .from("notes")
                                .update({ link_preview_id: previewId })
                                .eq("id", newNote.id);

                            queryClient.invalidateQueries({ queryKey: ["notes"] });
                        }
                    })
                    .catch((err) => console.error("Background preview error:", err));

                return;
            }


            if (entity === "tasklist") {
                addTaskList.mutateAsync({ title: formData.title })
                closeModal()
            }
        } catch (error) {
            console.error("Помилка при створенні:", error);
        } finally {
            if (entity !== "note") setIsSubmitting(false)
        }

    }

    return (

        <div className={`${styles.modal} ${isClosing ? styles.isClosing : ""}`} onClick={(e) => e.stopPropagation()}>
            {entity === "folder" && (
                <>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>Створення папки</h2>
                        <div className={styles.buttonsContainer}>
                            <Button className={styles.modalControlButton} onClick={closeModal} style={{ padding: 0 }}>
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
                            <Button className={styles.modalControlButton} onClick={closeModal} style={{ padding: 0 }}>
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
                            <Button className={styles.modalControlButton} onClick={closeModal} style={{ padding: 0 }}>
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
    )
}