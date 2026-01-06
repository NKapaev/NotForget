import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useUpdateNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...patch }) => {
            const { data, error } = await supabase
                .from("notes")
                .update(patch)
                .eq("id", id)
                .select()
                .single()

            if (error) throw error
            return data
        },

        onSuccess: (updatedNote) => {
            queryClient.setQueryData(["notes"], (old) =>
                old?.map(note =>
                    note.id === updatedNote.id ? updatedNote : note
                )
            )
        },
    })
}