import styles from "./modal.module.css"
import { useDispatch } from "react-redux"
import { useState, useRef, useEffect } from "react"
import { closeModal, openModal } from "../../redux/modalsSlice"
import { linkifyText } from "../../../utils/linkifyText"
import UrlPreviewCard from "../urlPreviewCard/UrlPreviewCard"
import useNote from "../../../hooks/useNote"
import supabase from "../../../utils/supabase"
import useScrollArrows from "../../../hooks/useScrollArrows";

import Button from "../button/Button"

export default function ViewModal({ modalId, noteId }) {

    const dispatch = useDispatch();
    const [isClosing, setIsClosing] = useState(false)
    const { data: note, isLoading } = useNote(noteId)
    const [previewData, setPreviewData] = useState(null)
    const clickTargetRef = useRef(null);
    const { contentRef, canScrollUp, canScrollDown } = useScrollArrows(note?.content);

    useEffect(() => {
        let isCurrent = true;

        if (note?.link_preview_id) {
            const fetchPreviewData = async () => {
                const { data, error } = await supabase
                    .from("link_previews")
                    .select("*")
                    .eq("id", note.link_preview_id)
                    .single();

                if (error) {
                    if (isCurrent) console.error(error.message);
                } else {
                    if (isCurrent) {
                        setPreviewData(data);
                    }
                }
            };

            fetchPreviewData();
        }

        return () => {
            isCurrent = false;
        };
    }, [note?.link_preview_id]);

    if (isLoading || !note) return null;

    return (
        <div className={`${styles.modalBackdrop} ${isClosing ? styles.isClosing : ""}`}

            onClick={(e) => {
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

            <div className={`${styles.modal} ${isClosing ? styles.isClosing : ""}`} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className={styles.modalHeader}>
                    <p>{note.title}</p>

                    <div className={styles.buttonsContainer}>
                        <Button className={styles.modalControlButton} onClick={() => { dispatch(openModal({ type: "edit", modalId: crypto.randomUUID(), noteId })) }}>
                            <img width="15px" src="/icons/pencil.svg#pencil-icon" alt="Edit" />
                        </Button>
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


                <div className={`${styles.scrollArrow} ${styles.topScrollArrow} ${canScrollUp ? styles.visible : ""}`}>
                    <svg className={styles.scrollArrowIcon} width="18" height="12">
                        <use href="/icons/small-arrow.svg#small-arrow"></use>
                    </svg>
                </div>

                <div className={styles.contentWrapper} ref={contentRef}>
                    {previewData && <UrlPreviewCard borderRounded={true} previewData={previewData} />}
                    <p className={styles.modalContent}>{linkifyText(note.content)}</p>
                </div>

                <div className={`${styles.scrollArrow} ${styles.bottomScrollArrow} ${canScrollDown ? styles.visible : ""}`}>
                    <svg className={`${styles.rotated}`} width="18" height="12">
                        <use href="/icons/small-arrow.svg#small-arrow"></use>
                    </svg>
                </div>
            </div>
        </div>
    )
}