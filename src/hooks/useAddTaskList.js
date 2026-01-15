import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useAddTaskList() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ title }) => {
            const { data, error } = await supabase
                .from("taskLists")
                .insert([{ title, user_id: (await supabase.auth.getUser()).data.user?.id }])
                .select()
                .single()

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