import useDeleteFolder from "../../hooks/useDeleteFolder"
import Button from "../ui/button/Button"
import "./folder.css"
import { useNavigate, useParams } from "react-router-dom"
import useMoveNote from "../../hooks/useMoveNote"


export default function Folder({ folder, displayMod }) {

    const params = useParams();
    const { id, title, description, created_at } = folder

    const navigate = useNavigate()

    const deleteFolder = useDeleteFolder(params.folderId ?? null);
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
        <li className={`folder tile ${displayMod === "list" && "row"}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
                e.preventDefault()
                e.target.style.transform = "scale(1.05)"
            }}
            onDragLeave={(e) => {
                e.target.style.transform = "scale(1)"
            }}
            onClick={() => { navigate(`/profile/${params.id}/folder/${id}`) }}>
            <div className="folderHeader">
                <p className="folder-name ">{title}</p>
                <Button className="delete-button" onClick={(e) => {
                    e.stopPropagation();
                    // e.target.closest("li").classList.add("fade-out")
                    deleteFolder(folder)
                }}>
                    <img width={"40px"} className="delete-button-icon" src="/icons/trash-icon.svg#trash-icon" alt="" />
                </Button>
            </div>
            <p className="folder-description ">{description}</p>
            <p className="creation-date ">{new Date(created_at).toLocaleDateString()}</p>
        </li>
    )
}