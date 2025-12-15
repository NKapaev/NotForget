import "./taskListsContainer.css"

import { useEffect, useState } from "react"

import { hideTaskList } from "../redux/taskListSlice"
import { useDispatch } from "react-redux"
import Button from "../ui/button/Button"
import { useParams } from "react-router-dom"
import supabase from "../../utils/supabase"
import TaskList from "../taskList/TaskList"
import { useSelector } from "react-redux"
import { useModal } from "../../context/ModalProvider"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import Form from "../form/Form"
import useAddTaskList from "../../hooks/useAddTaskList"


export default function TaskListsContainer({ isMobile = false }) {
    const { openModal, closeModal } = useModal()
    const addTaskList = useAddTaskList()
    const dispatch = useDispatch()

    const { id } = useParams()

    const queryClient = useQueryClient()

    function handleSubmit(formData) {
        addTaskList.mutateAsync({ name: formData.name })
        closeModal()
    }

    // Queries
    const { data: taskLists } = useQuery({
        queryKey: ['taskLists', id], queryFn: async () => {
            const { data, error } = await supabase
                .from("taskLists")
                .select("*")
                .eq("user_id", id).order("created_at", { ascending: false })

            if (error) throw error
            return data
        }
    })

    // Mutations  REWRITE THIS USING useAddTaskList HOOK
    const mutation = useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase.from("taskLists").insert([{ name: formData.name }]).select().single()
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['taskLists'] })
        },
    })

    return (
        // ${taskList.taskListShown ? "open" : ""}
        <div className={`task-lists-container  ${isMobile ? "mobile" : ""}`}>
            <Button aria-label="Створити новий список задач" className="add-tasklist-button" onClick={(e) => {
                openModal(<Form onSubmit={handleSubmit} fields={[{ name: "name", type: "text", placeholder: "Task list name" }]} >
                    <div className="form-button-container">
                        <Button type="submit">Створити</Button>
                    </div>
                </Form>)
            }}>{<svg className="tasklist-add-icon" width="20px" height="20px">
                <use href="/icons/plus-icon.svg#plus" fill="var(--blue)" width="20px" height="20px"></use>
            </svg>}</Button>

            {/* <Button className="toggle-task-list-btn" onClick={(e) => { dispatch(toggleTaskListOpen()) }}>{taskList.taskListShown ? ">" : "<"}</Button> */}

            {taskLists?.map((taskList) => {
                return (
                    <TaskList key={taskList.id} name={taskList.name} id={taskList.id} />
                )
            })}
        </div>
    )
}