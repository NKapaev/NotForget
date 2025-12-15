import supabase from "../../utils/supabase"
import useNotes from "../../hooks/useNotes"
import Note from "../note/Note"
import AddTile from "../addTile/AddTile"
import useFolder from "../../hooks/useFolder"
import Button from "../ui/button/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import "./noteList.css"

export default function NoteList({ folderId }) {
    const params = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: notes } = useNotes(folderId, null)
    const { data: folder } = useFolder(folderId)

    const moveNoteMutation = useMutation({
        mutationFn: async ({ noteId, folderId }) => {
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
        moveNoteMutation.mutateAsync({ noteId, folderId })
    }
    return (
        <div className="note-list-section">
            <h2>{folder?.name || ""}</h2>

            <ul className="note-list list unselectable"
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault()
                }}>

                <AddTile entity={"note"} folderId={folderId}></AddTile>
                {notes?.map((note) => {
                    return <Note key={note.id} id={note.id} folderId={note.folder_id} userId={note.user_id} content={note.content} createdAt={note.created_at} />
                })}
            </ul>

        </div>
    )
}