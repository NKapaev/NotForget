import useDeleteFolder from "../../hooks/useDeleteFolder"
import Button from "../ui/button/Button"
import "./folder.css"
import { useNavigate, useParams } from "react-router-dom"
import useMoveNote from "../../hooks/useMoveNote"


export default function Folder({ id, title, description, creationDate }) {
    const { id: profileId } = useParams();

    const navigate = useNavigate()

    const deleteFolder = useDeleteFolder();
    const moveNote = useMoveNote()

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.target.style.transform = "scale(1)"
        const noteId = e.dataTransfer.getData("text/plain")
        document.body.classList.remove("dragging")

        if (!noteId) return
        moveNote.mutate({ noteId, folderId: id })
    }

    return (
        <li className="folder tile"
            onDrop={handleDrop}
            onDragOver={(e) => {
                e.preventDefault()
                e.target.style.transform = "scale(1.05)"
            }}
            onDragLeave={(e) => {
                e.target.style.transform = "scale(1)"
            }}
            onClick={(e) => { navigate(`/profile/${profileId}/folder/${id}`) }}>
            <div className="folderHeader">
                <p className="folder-name ">{title}</p>
                <Button className="delete-button" onClick={(e) => {
                    e.stopPropagation();
                    e.target.closest("li").classList.add("fade-out")
                    deleteFolder.mutateAsync(id)
                }}>
                    <img width={"40px"} className="delete-button-icon" src="/icons/trash-icon.svg#trash-icon" alt="" />
                </Button>
            </div>
            <p className="folder-description ">{description}</p>
            <p className="creation-date ">{new Date(creationDate).toLocaleDateString()}</p>
        </li>
    )
}