import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export default function useAddNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ title, content, folderId = null, taskListId = null, linkPreviewId = null }) => {

            const user = (await supabase.auth.getUser()).data.user

            const { data, error } = await supabase
                .from("notes")
                .insert([{
                    title,
                    content: content.trim(),
                    folder_id: folderId || null,
                    task_list_id: taskListId || null,
                    user_id: user?.id,
                    link_preview_id: linkPreviewId,
                }])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"],
                exact: false
            })
        }
    })
}