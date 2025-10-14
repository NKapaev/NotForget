import useDeleteFolder from "../../hooks/useDeleteFolder"
import Button from "../ui/button/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import "./folder.css"
import { useLocation, useNavigate } from "react-router-dom"
import supabase from "../../utils/supabase"

export default function Folder({ id, name, description, creationDate }) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const mutation = useDeleteFolder();

    const moveNoteMutation = useMutation({
        mutationFn: async ({ noteId, folderId }) => {
            console.log(noteId, folderId);
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
        console.log(noteId);
        console.log(id)
        if (!noteId) return
        moveNoteMutation.mutate({ noteId, folderId: id })
    }

    return (
        <li onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}

            className="folder tile" onClick={(e) => {
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