import "./taskList.css"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import TaskExecution from "../taskExecution/TaskExecution"
import Button from "../ui/button/Button"
import supabase from "../../utils/supabase"
import useNotes from "../../hooks/useNotes"
import useDeleteNote from "../../hooks/useDeleteNote"

export default function TaskList({ id, className, name }) {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()
    const { data: notes, isLoading, error } = useNotes(null, id)

    const moveNoteMutation = useMutation({
        mutationFn: async ({ noteId, taskListId }) => {
            const { data, error } = await supabase
                .from("notes")
                .update({ task_list_id: taskListId, folder_id: null })
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

    const deleteNote = useDeleteNote()

    const handleDrop = (e) => {
        e.preventDefault()
        const noteId = e.dataTransfer.getData("text/plain")
        if (!noteId) return
        moveNoteMutation.mutate({ noteId, taskListId: id })
    }

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error.message}</div>

    return (
        <div
            className={`task-list ${className ?? ""} ${isOpen ? "isOpen" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <p>{name}</p>

            {/* Проверяем, что notes не пустой массив */}

            {isOpen && notes?.length ? (
                notes.map((note) => (
                    <div key={note.id} className="taskList-item" draggable="true" onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", note.id)
                    }}
                        onDragOver={(e) => { e.currentTarget.style.transform = "scale(1.2)" }}
                        onDragLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}
                    >
                        <Button
                            className="delete-button"
                            onClick={() => deleteNote.mutateAsync(note.id)}
                        >
                            <img
                                width="40px"
                                className="delete-button-icon"
                                src="/icons/trash-icon.svg#trash-icon"
                                alt=""
                            />
                        </Button>
                        <TaskExecution key={note.id} taskId={note.id}></TaskExecution>
                        <p>{note.content}</p>
                    </div>
                ))
            ) : (
                <p>Перетягніть задачу для додавання</p>
            )}
        </div>
    )
}