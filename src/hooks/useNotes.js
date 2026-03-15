import { useQuery } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useNotes(folderId = null, taskListId = null) {
    return useQuery({
        queryKey: ["notes", folderId, taskListId],
        queryFn: async () => {
            let query = supabase.from("notes").select("*");

            if (folderId) {
                // Если зашли в папку — только заметки этой папки
                query = query.eq("folder_id", folderId);
            } else if (taskListId) {
                // Если смотрим таск-лист — только его заметки
                query = query.eq("task_list_id", taskListId);
            } else {
                // ВАЖНО: Если мы в корне — только те, где ОБА родителя NULL
                query = query.is("folder_id", null).is("task_list_id", null);
            }

            const { data, error } = await query.order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
        enabled: true,
    });
}