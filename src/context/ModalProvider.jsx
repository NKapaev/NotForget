import "./modal.css"

import { createContext, useState, useContext } from "react";
import Button from "../components/ui/button/Button";

const ModalContext = createContext()

export default function ModalProvider({ children }) {
    const [content, setContent] = useState(null)

    const openModal = (component) => { setContent(component) }
    const closeModal = () => { setContent(null) }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {content && (
                <div className={`modal-backdrop`}>
                    <div className="modal">
                        <Button className="close-modal-button" onClick={closeModal}>
                            <img src="/icons/cross-icon.svg#cross-icon" alt="Close modal" />
                        </Button>
                        {content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}

export function useModal() {
    return useContext(ModalContext)
}