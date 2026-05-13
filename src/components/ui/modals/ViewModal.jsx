import styles from "./modal.module.css";

import useGetPreviewData from "../../../hooks/useGetPreviewData";
import useScrollArrows from "../../../hooks/useScrollArrows";
import useNote from "../../../hooks/useNote";
import UrlPreviewCard from "../urlPreviewCard/UrlPreviewCard";
import { useDispatch } from "react-redux";
import { linkifyText } from "../../../utils/linkifyText";
import { openModal } from "../../redux/modalsSlice";

import Button from "../button/Button";

export default function ViewModal({ modalId, noteId, isClosing, closeModal }) {

    const dispatch = useDispatch();
    const { data: note, isLoading } = useNote(noteId)
    const { data: previewData } = useGetPreviewData(note?.link_preview_id)
    const { contentRef, canScrollUp, canScrollDown } = useScrollArrows(note?.content);

    if (isLoading || !note) return null;

    return (
        <div className={`${styles.modal} ${isClosing ? styles.isClosing : ""}`} onClick={(e) => {
            e.stopPropagation()
        }}>
            <div className={styles.modalHeader}>
                <p>{note.title}</p>

                <div className={styles.buttonsContainer}>
                    <Button className={styles.modalControlButton} onClick={() => { dispatch(openModal({ type: "edit", modalId: crypto.randomUUID(), noteId })) }}>
                        <img width="15px" src="/icons/pencil.svg#pencil-icon" alt="Edit" />
                    </Button>
                    <Button className={styles.modalControlButton} onClick={

                        closeModal} style={{ padding: 0 }}>
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
    )
}