import useDeleteFolder from "../../hooks/useDeleteFolder"
import Button from "../ui/button/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import "./folder.css"
import { useLocation, useNavigate } from "react-router-dom"
import supabase from "../../utils/supabase"

export default function Folder({ id, title, description, creationDate }) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const mutation = useDeleteFolder();

    const moveNoteMutation = useMutation({
        mutationFn: async ({ noteId, folderId }) => {
            // console.log(noteId, folderId);
            const { data, error } = await supabase
                .from("notes")
                .update({ task_list_id: null, folder_id: folderId })
                .eq("id", noteId)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        },
    })

    const handleDrop = (e) => {
        e.preventDefault()
        const noteId = e.dataTransfer.getData("text/plain")
        document.body.classList.remove("dragging")

        if (!noteId) return
        moveNoteMutation.mutate({ noteId, folderId: id })
    }

    return (
        <li className="folder tile"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={(e) => { navigate(pathname + "/folder/" + id) }}>
            <div className="folderHeader">
                <p className="folder-name ">{title}</p>
                <Button className="delete-button" onClick={(e) => {
                    e.stopPropagation();
                    mutation.mutateAsync(id)
                }}>
                    <img width={"40px"} className="delete-button-icon" src="/icons/trash-icon.svg#trash-icon" alt="" />
                </Button>
            </div>
            <p className="folder-description ">{description}</p>
            <p className="creation-date ">{new Date(creationDate).toLocaleDateString()}</p>
        </li>
    )
}