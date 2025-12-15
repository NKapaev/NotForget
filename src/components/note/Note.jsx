import "./note.css"
import useDeleteNote from "../../hooks/useDeleteNote"
import Button from "../ui/button/Button"
import { useModal } from "../../context/ModalProvider"

export default function Note({ id, content, createdAt }) {
    const mutation = useDeleteNote()
    const { openModal } = useModal()

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", id)
        e.dataTransfer.effectAllowed = "move"
        document.body.classList.add("dragging")
    }

    const handleDragEnd = (e) => {
        document.body.classList.remove("dragging")
    }

    return (
        <li
            draggable
            className="tile note"
            id={id}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={() => {
                openModal(content)
            }}
        >
            <Button
                className="delete-button"
                onClick={(e) => {
                    e.stopPropagation()
                    mutation.mutateAsync(id)
                }}
            >
                <img
                    width="40px"
                    className="delete-button-icon"
                    src="/icons/trash-icon.svg#trash-icon"
                    alt=""
                />
            </Button>
            <div className="note-content-wrapper">
                <p className="note-content">{content}</p>
            </div>
            <p className="creation-date ">{new Date(createdAt).toLocaleDateString()}</p>
        </li >
    )
}