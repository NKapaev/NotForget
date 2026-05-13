import { useQuery } from "@tanstack/react-query";
import supabase from "../utils/supabase";

import normalizePreviewData from "../utils/normalizePreviewData";

export default function useGetPreviewData(id) {
    return useQuery({
        queryKey: ["link_preview", id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("link_previews")
                .select("*")
                .eq("id", id)
                .single();
            if (error) throw error;
            return normalizePreviewData(data);
        },

        enabled: !!id,
    });
}