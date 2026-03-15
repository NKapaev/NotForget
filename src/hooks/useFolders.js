import { useQuery } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useFolders(folderId = null) {
    return useQuery({

        queryKey: ["folders", folderId],
        queryFn: async () => {
            let query = supabase.from("folders").select("*");

            if (folderId) {
                // Если мы внутри папки — ищем подпапки
                query = query.eq("folder_id", folderId);
            } else {
                // Если мы в корне — ищем только корневые папки
                query = query.is("folder_id", null);
            }

            const { data, error } = await query.order("created_at", { ascending: false });
            if (error) throw error;
            return data;
        },
    });
}