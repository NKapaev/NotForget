import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useDeleteTaskList() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id }) => {
            const { data, error } = await supabase
                .from("taskLists")
                .delete()
                .eq("id", id)

            if (error) throw error
            return data
        },
        onSuccess: () => {
            // вариант 1: рефетч из базы
            queryClient.invalidateQueries({ queryKey: ["taskLists"] })

            // вариант 2 (быстрее): обновить кэш локально
            // queryClient.setQueryData(["folders"], (old) => [...(old || []), newFolder])
        },
    })
}