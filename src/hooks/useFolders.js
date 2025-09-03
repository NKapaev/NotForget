import { useQuery } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useFolders() {
    return useQuery({
        queryKey: ["folders"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("folders")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            return data
        },
    })
}