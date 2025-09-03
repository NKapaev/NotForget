import "./folderList.css"

import Folder from "../folder/Folder"
import AddTile from "../addtile/AddTile"
import { useNavigate, useParams } from "react-router-dom"
import useFolders from "../../hooks/useFolders"

export default function FolderList() {

    const { id } = useParams()
    const navigate = useNavigate()

    const { data: folders } = useFolders()

    return (
        <ul className="folder-list list">
            <AddTile entity={"folder"} />
            {folders?.map((folder) => {
                return < Folder key={folder.id} id={folder.id} name={folder.name} description={folder.description} creationDate={folder.created_at} />
            }
            )}
        </ul>
    )
}