import { useQuery } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useNotes(folderId = null, taskListId = null) {
    return useQuery({
        queryKey: ["notes", folderId, taskListId],
        queryFn: async () => {
            let query = supabase.from("notes").select("*")

            if (folderId) {
                query = query.eq("folder_id", folderId)
            }

            if (taskListId) {
                query = query.eq("task_list_id", taskListId) // 👈 новое имя поля
            }

            query = query.order("created_at", { ascending: false })

            const { data, error } = await query
            if (error) throw error
            return data
        },
        enabled: !!folderId || !!taskListId,
    })

}