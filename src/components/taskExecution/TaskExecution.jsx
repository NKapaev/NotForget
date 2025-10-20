import "./taskExecution.css"
import supabase from "../../utils/supabase"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import debounce from "../../utils/debounce"

function taskStateGenerator(currentState) {
    const states = ["not started", "in progress", "completed"]
    const currentIndex = states.indexOf(currentState)
    return states[(currentIndex + 1) % states.length]
}

export default function TaskExecution({ taskId }) {
    const [executionState, setExecutionState] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const queryClient = useQueryClient()

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
        debounce(mutation.mutate(newState), 500)

    }

    if (isLoading) return <div className="task-execution loading">Loading...</div>

    return (
        <div
            className={`task-execution ${executionState?.split(" ").join("-")}`}
            onClick={handleClick}
        >
        </div>
    )
}