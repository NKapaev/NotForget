import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export default function useMoveNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ noteId, folderId, taskListId }) => {

            const { data, error } = await supabase.from("notes").update({
                folder_id: folderId || null,
                task_list_id: taskListId || null,
            }).eq("id", noteId).select().single()

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