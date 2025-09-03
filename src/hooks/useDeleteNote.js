import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../utils/supabase";

export default function useDeleteNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data, error } = await supabase.from("notes").delete().eq("id", id)
            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] })
        },

    })
}