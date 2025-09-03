import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useAddFolder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ name, description }) => {
            const { data, error } = await supabase
                .from("folders")
                .insert([{ name, description, user_id: (await supabase.auth.getUser()).data.user?.id }])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            // вариант 1: рефетч из базы
            queryClient.invalidateQueries({ queryKey: ["folders"] })

            // вариант 2 (быстрее): обновить кэш локально
            // queryClient.setQueryData(["folders"], (old) => [...(old || []), newFolder])
        },
    })
}