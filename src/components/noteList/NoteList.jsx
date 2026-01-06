import "./noteList.css"

import supabase from "../../utils/supabase"
import useNotes from "../../hooks/useNotes"
import Note from "../note/Note"
import AddTile from "../addTile/AddTile"
import useFolder from "../../hooks/useFolder"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function NoteList({ folderId }) {

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
            <h2>{folder?.title || ""}</h2>

            <ul className="note-list list unselectable"
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault()
                }}>

                <AddTile entity={"note"} folderId={folderId}></AddTile>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />
                })}
            </ul>

        </div>
    )
}