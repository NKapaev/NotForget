import useNotes from "../../hooks/useNotes"
import Note from "../note/Note"
import AddTile from "../addTile/AddTile"
import useFolder from "../../hooks/useFolder"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../../utils/supabase"
import "./noteList.css"


export default function NoteList({ folderId }) {
    const { data: notes } = useNotes(folderId, null)
    const { data: folder } = useFolder(folderId)
    const queryClient = useQueryClient()

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
        if (!noteId) return
        moveNoteMutation.mutateAsync({ noteId, folderId })
    }
    return (
        <>
            {notes?.length === 0 ? "Here nothing yet" : ""}
            <h2>{folder?.name || ""}</h2>
            <ul className="note-list list"
                onDrop={handleDrop}
                onDragOver={(e) => {
                    e.preventDefault()
                }}>

                <AddTile entity={"note"} folderId={folderId}></AddTile>
                {notes?.map((note) => {
                    console.log(note)
                    return <Note key={note.id} id={note.id} folderId={note.folder_id} userId={note.user_id} content={note.content} createdAt={note.created_at} />
                })}
            </ul>
        </>
    )
}