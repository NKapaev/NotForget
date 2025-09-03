import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export default function useNotes(folderId) {
    return useQuery({
        queryKey: ["notes", folderId],
        queryFn: async () => {
            let query = supabase.from("notes").select("*")

            if (folderId) {
                query = query.eq("folder_id", folderId)
            }

            const { data, error } = await query
            if (error) throw error
            return data
        },
        enabled: !!folderId,
    })
}