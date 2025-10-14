import "./note.css"
import useDeleteNote from "../../hooks/useDeleteNote"
import Button from "../ui/button/Button"

export default function Note({ id, content, createdAt }) {
    const mutation = useDeleteNote()

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", id)
        e.dataTransfer.effectAllowed = "move"
    }

    return (
        <li
            draggable
            className="folder tile"
            id={id}
            onDragStart={handleDragStart}
        >
            <Button
                className="delete-button"
                onClick={() => mutation.mutateAsync(id)}
            >
                <img
                    width="40px"
                    className="delete-button-icon"
                    src="/icons/trash-icon.svg#trash-icon"
                    alt=""
                />
            </Button>
            <p>{content}</p>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
        </li>
    )
}