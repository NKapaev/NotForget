import styles from "./taskList.module.css"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import supabase from "../../utils/supabase"
import useNotes from "../../hooks/useNotes"
import useDeleteNote from "../../hooks/useDeleteNote"
import useDeleteTaskList from "../../hooks/useDeleteTaskList"
import useAddNote from "../../hooks/useAddNote"
import { useFadeToggle } from "../../hooks/useFadeToggle"
// import { useModal } from "../../context/ModalProvider"

import TaskExecution from "../taskExecution/TaskExecution"
import Form from "../form/Form"
import Button from "../ui/button/Button"
import Loader from "../ui/loader/Loader"

export default function TaskList({ id, className, title }) {
    // const [isOpen, setIsOpen] = useState(true)
    // const { openModal, closeModal } = useModal()
    const queryClient = useQueryClient()
    const deleteTaskList = useDeleteTaskList()
    const { data: notes, isLoading, error } = useNotes(null, id)
    const { ref, hide, show } = useFadeToggle(200);
    const addNote = useAddNote()

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
        document.body.classList.remove("dragging")
        if (!noteId) return
        moveNoteMutation.mutate({ noteId, taskListId: id })
    }

    const handleSubmit = ((formData) => {
        addNote.mutateAsync({ content: formData.task, taskListId: id })
        closeModal()
    })

    const toggle = (e) => {
        e.stopPropagation();
        if (ref.current?.style.display === "none") {
            show();
        } else {
            hide();
        }
    };

    if (isLoading) return <Loader />
    if (error) return <div>Ошибка: {error.message}</div>

    return (
        <div
            className={`${styles.taskList} ${className ?? ""} `}
            // ${isOpen ? "isOpen" : ""}
            // onClick={toggle}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className={styles.taskListHeader} onClick={toggle}>
                <div className="">
                    <p className={styles.taskListTitle}>{title}</p>

                    <Button
                        className="add-task-button"
                        onClick={async () => {
                            openModal(<Form onSubmit={handleSubmit} fields={[{ name: "task", type: "text", placeholder: "Task content" }]} >
                                <div className="form-button-container">
                                    <Button type="submit">Створити</Button>
                                </div>
                            </Form>)
                        }}
                    >

                        Додати задачу
                    </Button>
                </div>

                <Button
                    className="delete-button"
                    onClick={() => deleteTaskList.mutateAsync({ id })}
                >
                    <img
                        width="40px"
                        className="delete-button-icon"
                        src="/icons/trash-icon.svg#trash-icon"
                        alt=""
                    />
                </Button>
            </div>

            {/* Проверяем, что notes не пустой массив */}

            <div ref={ref} className={`task-list-content`}>
                {/* ${isOpen ? "isOpen" : ""} */}
                {notes?.length ? (
                    notes.map((note) => (
                        <div key={note.id} className={styles.taskListItem} draggable="true"
                            onDragStart={(e) => {
                                e.dataTransfer.setData("text/plain", note.id)
                                document.body.classList.add("dragging")
                            }}
                            onDragEnd={() => {
                                document.body.classList.remove("dragging")
                            }}
                            onClick={() => {
                                openModal(<div style={{
                                    hyphens: "auto",
                                    overflowWrap: "break-word",
                                }}>{note.content}</div>)
                            }}
                            onDragOver={(e) => { e.currentTarget.style.transform = "scale(1.01)" }}
                            onDragLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}

                            onDrop={(e) => {
                                e.currentTarget.style.transform = "scale(1)"
                                document.body.classList.remove("dragging")
                            }}
                        >

                            <TaskExecution key={note.id} taskId={note.id}></TaskExecution>
                            <p className={styles.taskContent}>{note.content}</p>
                            <Button
                                className={`${styles.deleteButton} delete-button`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNote.mutateAsync(note.id)
                                }
                                }
                            >
                                <img
                                    width="40px"
                                    className="delete-button-icon"
                                    src="/icons/trash-icon.svg#trash-icon"
                                    alt=""
                                />
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>Перетягніть задачу для додавання</p>
                )}
            </div>
        </div >
    )
}