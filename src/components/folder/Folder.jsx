import useDeleteFolder from "../../hooks/useDeleteFolder"
import Button from "../ui/button/Button"
import "./folder.css"
import { useLocation, useNavigate } from "react-router-dom"

export default function Folder({ id, name, description, creationDate }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const mutation = useDeleteFolder();

    return (
        <li className="folder tile" onClick={(e) => {
            if (e.detail === 2) {
                navigate(pathname + "/folder/" + id)
            }
        }}>
            <Button className="delete-button" onClick={() => {
                mutation.mutateAsync(id)
            }}>
                <img width={"40px"} className="delete-button-icon" src="/icons/trash-icon.svg#trash-icon" alt="" />
            </Button>
            <p className="folder-name">{name}</p>
            <p className="folder-description">{description}</p>
            <p className="creation-date">{new Date(creationDate).toLocaleDateString()}</p>
        </li>
    )
}