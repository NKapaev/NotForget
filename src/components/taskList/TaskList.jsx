import styles from "./taskList.module.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { openModal } from "../redux/modalsSlice"
import { linkifyText } from "../../utils/linkifyText"
import useNotes from "../../hooks/useNotes"
import useDeleteNote from "../../hooks/useDeleteNote"
import useDeleteTaskList from "../../hooks/useDeleteTaskList"
import useMoveNote from "../../hooks/useMoveNote"
import { useFadeToggle } from "../../hooks/useFadeToggle"
import { hideTaskList, setWasClosedBeforeDrag } from "../redux/taskListSlice"

import TaskExecution from "../taskExecution/TaskExecution"
import Button from "../ui/button/Button"
import Loader from "../ui/loader/Loader"
import { extractLink } from "../../utils/extractLink"

export default function TaskList({ id, className, taskList }) {
    const params = useParams()
    const [isOpen, setIsOpen] = useState(false)
    const { taskListShown, wasClosedBeforeDrag } = useSelector((state) => state.taskList)

    const deleteTaskList = useDeleteTaskList()
    const { data: notes, isLoading, error } = useNotes(null, id)
    const { ref, hide, show } = useFadeToggle(200);
    const dispatch = useDispatch()

    const moveNote = useMoveNote()

    const deleteNote = useDeleteNote(params.folderId, id)

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const noteId = e.dataTransfer.getData("text/plain")
        document.body.classList.remove("dragging")
        if (!noteId) return
        moveNote.mutate({ noteId, folderId: null, taskListId: id })
        if (wasClosedBeforeDrag) { // берём из Redux, а не из dataTransfer
            dispatch(hideTaskList())
        }
    }

    const toggle = (e) => {
        e.stopPropagation();
        if (ref.current?.style.display === "none") {
            show();
        } else {
            hide();
        }
    };

    if (isLoading) return <Loader />
    if (error) return <div>Помилка: {error.message}</div>

    return (
        <div
            className={`${styles.taskList} ${className ?? ""} `}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className={styles.taskListHeader} onClick={(e) => {
                setIsOpen(prev => !prev)
                toggle(e)
            }}>
                <div className={styles.taskListHeaderContent}>

                    <Button variant="transparent" className={styles.dropButton}>
                        <svg className={`${styles.dropButtonIcon} ${isOpen ? styles.rotated : ""}`} width="20px" height="20px" >
                            <use href="/icons/arrow.svg#arrow"></use>
                        </svg>
                    </Button>

                    <p className={styles.taskListTitle}>{taskList.title}</p>

                    <Button
                        className={styles.addTaskButton}
                        onClick={async (e) => {
                            e.stopPropagation()
                            dispatch(openModal({ type: "create", entity: "note", taskListId: id, modalId: crypto.randomUUID(), }))
                        }}
                    >

                        <svg className="tasklist-add-icon" width="20px" height="20px" style={{ margin: 0 }}>
                            <use href="/icons/plus-icon.svg#plus" fill="var(--blue)" width="20px" height="20px"></use>
                        </svg>
                    </Button>
                    <Button
                        className="delete-button"
                        onClick={() => {
                            deleteTaskList(taskList)
                        }}
                    >
                        <img
                            width="40px"
                            className="delete-button-icon"
                            src="/icons/trash-icon.svg#trash-icon"
                            alt=""
                        />
                    </Button>
                </div>


            </div>

            {/* Проверяем, что notes не пустой массив */}

            <div ref={ref} className={styles.taskListContent}>
                {/* ${isOpen ? "isOpen" : ""} */}
                {notes?.length ? (
                    notes.map((note) => (
                        <div key={note.id} className={styles.taskListItem} draggable="true"
                            onDragStart={(e) => {
                                e.dataTransfer.setData("text/plain", note.id)
                                document.body.classList.add("dragging")
                                dispatch(setWasClosedBeforeDrag(!taskListShown)) // вместо dataTransfer.setData('wasClosedBeforeDrag', ...)
                            }}
                            onDragEnd={() => {
                                document.body.classList.remove("dragging")
                            }}
                            onClick={(e) => {
                                if (e.target.tagName === "A") {
                                    return
                                }

                                e.preventDefault()
                                dispatch(openModal({ type: "view", entity: "note", modalId: crypto.randomUUID(), noteId: note.id, props: { content: note.content, title: note.title } }))
                            }}
                        // onDragOver={(e) => { e.currentTarget.style.transform = "scale(1.01)" }}
                        // onDragLeave={(e) => { e.currentTarget.style.transform = "scale(1)" }}

                        // onDrop={(e) => {
                        //     e.currentTarget.style.transform = "scale(1)"
                        //     document.body.classList.remove("dragging")
                        // }}
                        >

                            <div className={styles.taskContentWrapper}>
                                <TaskExecution taskId={note.id}></TaskExecution>
                                {(() => {
                                    const detectedLink = extractLink(note.content);

                                    return (
                                        <>
                                            {/* 1. Заголовок отображается всегда, если он есть */}
                                            {note.title && (
                                                detectedLink ? (
                                                    // Если есть и заголовок, и ссылка — заголовок становится ссылкой
                                                    <a
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        className={`${styles.taskTitle} ${styles.taskTitleLink}`}
                                                        href={detectedLink.toLowerCase().startsWith('http') ? detectedLink : `https://${detectedLink}`}
                                                    >
                                                        {note.title}
                                                    </a>
                                                ) : (
                                                    // Если есть только заголовок — выводим обычный текст (h3 или span по вкусу)
                                                    <h3 className={styles.taskTitle}>{note.title}</h3>
                                                )
                                            )}

                                            {/* 2. Контент: ссылка внутри скроется, только если отобразился заголовок-ссылка */}
                                            <p className={styles.taskContent}>
                                                {linkifyText(note.content, note.title ? detectedLink : null)}
                                            </p>
                                        </>
                                    );
                                })()}
                            </div>
                            <Button
                                className={`${styles.deleteButton} delete-button`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    e.target.closest("div").classList.add(styles.fadeOut)
                                    deleteNote(note)
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