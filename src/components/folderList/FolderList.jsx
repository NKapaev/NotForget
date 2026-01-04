import "./folderList.css"


import Folder from "../folder/Folder"
import AddTile from "../addTile/AddTile"
import { useNavigate, useParams } from "react-router-dom"
import useFolders from "../../hooks/useFolders"

export default function FolderList() {

    const { id } = useParams()
    const navigate = useNavigate()

    const { data: folders } = useFolders()

    return (
        <ul className="folder-list list unselectable">
            <AddTile entity={"folder"} />
            {folders?.map((folder) => {
                return < Folder key={folder.id} id={folder.id} title={folder.title} description={folder.description} creationDate={folder.created_at} />
            }
            )}
        </ul>
    )
}