import styles from "./modal.module.css"

import { createContext, useState, useContext, useRef, useEffect, useLayoutEffect } from "react";
import Button from "../components/ui/button/Button";


const ModalContext = createContext()

export default function ModalProvider({ children }) {

    const [content, setContent] = useState(null)
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    const contentRef = useRef(null);

    const updateScrollState = () => {
        const el = contentRef.current;
        if (!el) return;

        setCanScrollUp(el.scrollTop > 0);
        setCanScrollDown(
            el.scrollTop + el.clientHeight < el.scrollHeight
        );
    };

    const openModal = (component) => {
        setContent(component)
        document.body.classList.add("modalIsOpen");

    }
    const closeModal = () => {
        setContent(null)
        document.body.classList.remove("modalIsOpen");

    }

    useLayoutEffect(() => {
        if (content) {
            requestAnimationFrame(updateScrollState);
        }
    }, [content]);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);

        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, [content]);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {content && (
                <div className={`${styles.modalBackdrop} ${content ? styles.isOpen : ""}`}
                    onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => {
                        e.stopPropagation()
                    }}>
                        <Button className={styles.closeModalButton} onClick={closeModal} style={{ padding: 0 }}>
                            <img width="15px" src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                        </Button>

                        <div className={`${styles.scrollArrow} ${styles.up} ${canScrollUp ? styles.visible : ""}`}>
                            <svg className={styles.scrollArrowIcon} width="30" height="30">
                                <use href="/icons/small-arrow.svg#small-arrow"></use>
                            </svg>
                        </div>


                        <div
                            className={styles.modalContent}
                            ref={contentRef}
                        >
                            {content}
                        </div>


                        <div className={`${styles.scrollArrow} ${styles.down} ${canScrollDown ? styles.visible : ""}`}>
                            <svg className={`${styles.rotated}`} width="30" height="30">
                                <use href="/icons/small-arrow.svg#small-arrow"></use>
                            </svg>
                        </div>

                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}

export function useModal() {
    return useContext(ModalContext)
}