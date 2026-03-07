import styles from "./modal.module.css"
import { useSelector, useDispatch } from "react-redux"
import { useState, useRef, useEffect, useLayoutEffect } from "react"
import { closeModal, openModal } from "../../redux/modalsSlice"
import { linkifyText } from "../../../utils/linkifyText"
import UrlPreviewCard from "../urlPreviewCard/UrlPreviewCard"
import useNote from "../../../hooks/useNote"
import supabase from "../../../utils/supabase"

import Button from "../button/Button"

export default function ViewModal({ modalId, noteId }) {

    const { data: note, isLoading } = useNote(noteId)
    const [previewData, setPreviewData] = useState(null)
    console.log(note)

    useEffect(() => {
        let isCurrent = true;
        if (note?.link_preview_id) {
            const fetchPreviewData = async () => {
                const { data, error } = await supabase.from("link_previews").select("*").eq("id", note.link_preview_id).single()
                if (error) {
                    console.error(error.message)
                } else {
                    setPreviewData(data)
                }
            }
            fetchPreviewData()
        }

        return () => {
            isCurrent = false
        }
    }, [note?.link_preview_id])



    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const contentRef = useRef(null);

    const updateScrollState = () => {
        const el = contentRef.current

        if (!el) return;

        const scrollTop = el.scrollTop > 0;
        const scrollBottom = el.scrollTop + el.clientHeight < el.scrollHeight;

        setCanScrollUp(prev => (prev !== scrollTop ? scrollTop : prev));
        setCanScrollDown(prev => (prev !== scrollBottom ? scrollBottom : prev));
    };


    if (note?.content) {
        requestAnimationFrame(updateScrollState);
    }


    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);

        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [note?.content]);



    const dispatch = useDispatch();

    if (isLoading) return null
    if (!note) return null
    return (
        <div className={styles.modalBackdrop} onClick={() => { dispatch(closeModal(modalId)) }}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <p>{note.title}</p>

                    <div className={styles.buttonsContainer}>
                        <Button className={styles.modalControlButton} onClick={() => { dispatch(openModal({ type: "edit", modalId: crypto.randomUUID(), noteId })) }}>
                            <img width="15px" src="/icons/pencil.svg#pencil-icon" alt="Edit" />
                        </Button>
                        <Button className={styles.modalControlButton} onClick={() => { dispatch(closeModal(modalId)) }} style={{ padding: 0 }}>
                            <img width="15px" src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                        </Button>
                    </div>
                </div>
                <div className={`${styles.scrollArrow} ${styles.up} ${canScrollUp ? styles.visible : ""}`}>
                    <svg className={styles.scrollArrowIcon} width="30" height="30">
                        <use href="/icons/small-arrow.svg#small-arrow"></use>
                    </svg>
                </div>
                <div className={styles.contentWrapper} ref={contentRef}>
                    {previewData && <UrlPreviewCard previewData={previewData} />}
                    <p className={styles.modalContent} >{linkifyText(note.content)}</p>
                </div>
                <div className={`${styles.scrollArrow} ${styles.down} ${canScrollDown ? styles.visible : ""}`}>
                    <svg className={`${styles.rotated}`} width="30" height="30">
                        <use href="/icons/small-arrow.svg#small-arrow"></use>
                    </svg>
                </div>
            </div>
        </div>
    )
}