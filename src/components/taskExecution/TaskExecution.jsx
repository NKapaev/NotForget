import "./taskExecution.css"
import supabase from "../../utils/supabase"
import { useEffect, useState, useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import debounce from "../../utils/debounce"

import Loader from "../ui/loader/Loader"

function taskStateGenerator(currentState) {
    const states = ["not started", "in progress", "completed"]
    const currentIndex = states.indexOf(currentState)
    return states[(currentIndex + 1) % states.length]
}

export default function TaskExecution({ taskId }) {
    const [executionState, setExecutionState] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const queryClient = useQueryClient()

    const debouncedMutate = useRef(
        debounce((newState) => {
            mutation.mutate(newState)
        }, 1000)
    ).current

    // Мутация обновления состояния задачи
    const mutation = useMutation({
        mutationFn: async (newState) => {
            const { data, error } = await supabase
                .from("notes")
                .update({ execution_state: newState })
                .eq("id", taskId)
                .select()
                .single()
            if (error) throw error
            return data
        },
        onSuccess: (updatedNote) => {
            queryClient.setQueryData(["notes"], (oldNotes) => {
                if (!oldNotes) return [updatedNote]
                return oldNotes.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                )
            })
        }
    })

    // Получение состояния при первом рендере
    useEffect(() => {
        const fetchTask = async () => {
            setIsLoading(true)
            const { data, error } = await supabase
                .from("notes")
                .select("execution_state")
                .eq("id", taskId)
                .single()

            if (error) {
                console.error(error)
                setIsLoading(false)
                return
            }

            setExecutionState(data.execution_state)
            setIsLoading(false)
        }

        fetchTask()
    }, [taskId])

    const handleClick = (e) => {
        e.stopPropagation()
        if (!executionState) return

        const newState = taskStateGenerator(executionState)
        setExecutionState(newState)

        debouncedMutate(newState)
    }

    if (isLoading) return <Loader />

    return (
        <div
            className={`task-execution ${executionState?.split(" ").join("-")}`}
            onClick={handleClick}
        >
        </div>
    )
}