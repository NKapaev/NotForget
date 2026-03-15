import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useAddFolder() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ title, description, folderId = null }) => {
            const { data, error } = await supabase
                .from("folders")
                .insert([{ title, description, user_id: (await supabase.auth.getUser()).data.user?.id, folder_id: folderId }])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            // вариант 1: рефетч из базы
            queryClient.invalidateQueries({
                queryKey: ["folders"],
                exact: false
            })

            // вариант 2 (быстрее): обновить кэш локально
            // queryClient.setQueryData(["folders"], (old) => [...(old || []), newFolder])
        },
    })
}