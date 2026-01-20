import "./note.css"
import useDeleteNote from "../../hooks/useDeleteNote"
import useNote from "../../hooks/useNote"

import Button from "../ui/button/Button"
import { openModal } from "../../components/redux/modalsSlice"

import { useDispatch, useSelector } from "react-redux"

export default function Note({ note: { id, title, content, created_at } }) {
    const deleteNote = useDeleteNote()

    const dispatch = useDispatch()

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
            onClick={(e) => {
                e.preventDefault()
                dispatch(openModal({
                    type: 'view',
                    modalId: crypto.randomUUID(),
                    noteId: id,
                }))

            }}
        >

            <div className="noteHeader">
                <p className="note-title">{title}</p>
                <Button
                    className="delete-button"
                    onClick={(e) => {
                        e.stopPropagation()
                        deleteNote.mutateAsync(id)
                    }}
                >
                    <img
                        width="40px"
                        className="delete-button-icon"
                        src="/icons/trash-icon.svg#trash-icon"
                        alt=""
                    />
                </Button>
            </div>
            <div className="note-content-wrapper">
                <p className="note-content">{content}</p>
            </div>
            <p className="creation-date ">{new Date(created_at).toLocaleDateString()}</p>
        </li >
    )
}