import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export default function useAddNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ content, folderId }) => {
            const user = (await supabase.auth.getUser()).data.user

            const { data, error } = await supabase
                .from("notes")
                .insert([{
                    content,
                    folder_id: folderId,
                    user_id: user?.id,
                }])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: (data, { folderId }) => {
            // инвалидируем только кэш этой папки
            queryClient.invalidateQueries({ queryKey: ["notes", folderId] })
        }
    })
}