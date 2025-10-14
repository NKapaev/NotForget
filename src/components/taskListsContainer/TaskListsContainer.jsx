import "./taskListsContainer.css"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toggleTaskListOpen } from "../redux/taskListSlice"
import Button from "../ui/button/Button"
import { useParams } from "react-router-dom"
import supabase from "../../utils/supabase"
import TaskList from "../taskList/TaskList"
import { useSelector } from "react-redux"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"


export default function TaskListsContainer() {

    const dispatch = useDispatch()
    const taskList = useSelector((state) => state.taskList)

    const { id } = useParams()

    const queryClient = useQueryClient()

    // Queries
    const { data: taskLists } = useQuery({
        queryKey: ['taskLists', id], queryFn: async () => {
            const { data, error } = await supabase
                .from("taskLists")
                .select("*")
                .eq("user_id", id)

            if (error) throw error
            return data
        }
    })

    // Mutations
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
        <div className={`task-lists-container ${taskList.taskListShown ? "open" : ""}`}>

            <Button className="toggle-task-list-btn" onClick={(e) => { dispatch(toggleTaskListOpen()) }}>{taskList.taskListShown ? ">" : "<"}</Button>

            {taskLists?.map((taskList) => {
                return (
                    <TaskList key={taskList.id} name={taskList.name} id={taskList.id} />
                )
            })}
        </div>
    )
}