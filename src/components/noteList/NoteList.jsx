import useNotes from "../../hooks/useNotes"
import Note from "../note/Note"
import AddTile from "../addtile/AddTile"
import useFolder from "../../hooks/useFolder"
import "./noteList.css"


export default function NoteList({ folderId }) {
    const { data: notes } = useNotes(folderId)
    const { data: folder } = useFolder(folderId)
    return (
        <>
            {notes?.length === 0 ? "Here nothing yet" : ""}
            <h2>{folder?.name || ""}</h2>
            <ul className="note-list list">
                <AddTile entity={"note"} folderId={folderId}></AddTile>
                {notes?.map((note) => {
                    return <Note key={note.id} id={note.id} folderId={note.folder_id} userId={note.user_id} content={note.content} />
                })}
            </ul>
        </>
    )
}