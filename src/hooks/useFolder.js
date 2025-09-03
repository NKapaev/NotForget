import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export default function useFolder(folderId) {
    return useQuery({
        queryKey: ["folder", folderId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("folders")
                .select("*")
                .eq("id", folderId)
                .single();
            if (error) throw error;
            return data;
        },
        enabled: !!folderId,
    });
}