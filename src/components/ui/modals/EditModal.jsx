import styles from "./modal.module.css"

import useNote from "../../../hooks/useNote"
import useUpdateNote from "../../../hooks/useUpdateNote"
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/modalsSlice";
import extractPreviewId from "../../../utils/extractPreviewId"
import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import supabase from "../../../utils/supabase";


import Form from "../../form/Form";
import Button from "../button/Button";

export default function EditModal({ modalId, noteId }) {
    const [isClosing, setIsClosing] = useState(false)
    const { data: note } = useNote(noteId)
    const clickTargetRef = useRef(null)

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const updateNote = useUpdateNote()

    if (!note) return null

    return (
        <div className={styles.modalBackdrop} onClick={(e) => {
            if (e.target === e.currentTarget && clickTargetRef.current === e.currentTarget) {
                setIsClosing(true);
                setTimeout(() => {
                    dispatch(closeModal(modalId));
                }, 300);
            }
        }}
            onMouseDown={(e) => {
                clickTargetRef.current = e.target;
            }}>

            <div className={`${styles.modal} ${isClosing ? styles.isClosing : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div className={styles.buttonsContainer} style={{ marginLeft: "auto" }}>
                        <Button className={styles.modalControlButton} onClick={() => {
                            setIsClosing(true);
                            setTimeout(() => {
                                dispatch(closeModal(modalId));
                            }, 300);
                        }} style={{ padding: 0 }}>
                            <img width="15px" src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                        </Button>
                    </div>
                </div>

                <Form
                    onSubmit={async (formData) => {

                        await updateNote.mutateAsync({
                            id: noteId,
                            title: formData.title,
                            content: formData.content,
                            linkPreviewId: null
                        })
                        setIsClosing(true);
                        setTimeout(() => {
                            dispatch(closeModal(modalId));
                        }, 300);

                        extractPreviewId(formData.content)
                            .then(async (previewId) => {
                                // Обновляем в БД только если нашли новое превью или если оно изменилось
                                if (previewId !== note.link_preview_id) {
                                    await supabase
                                        .from("notes")
                                        .update({ link_preview_id: previewId })
                                        .eq("id", noteId);

                                    queryClient.invalidateQueries({ queryKey: ["notes"] });
                                    queryClient.invalidateQueries({ queryKey: ["note", noteId] });
                                }
                            })
                            .catch((err) => console.error("Background preview error:", err));
                    }}
                    fields={[
                        { name: "title", type: "text", placeholder: "Заголовок" },
                        { name: "content", type: "textarea", placeholder: "Запис", listenUrl: true }
                    ]}
                    initialValues={{
                        title: note.title,
                        content: note.content
                    }}
                >
                    <div className="form-button-container">
                        <Button type="submit">Оновити</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}