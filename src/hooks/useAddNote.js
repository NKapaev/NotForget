import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export default function useAddNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ content, folderId = null, taskListId = null }) => {
            const user = (await supabase.auth.getUser()).data.user

            const { data, error } = await supabase
                .from("notes")
                .insert([{
                    content,
                    folder_id: folderId,
                    task_list_id: taskListId,
                    user_id: user?.id,
                }])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            // инвалидируем только кэш этой папки
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        }
    })
}