import { useMutation, useQueryClient } from "@tanstack/react-query"
import supabase from "../utils/supabase"

export default function useUpdateNote() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, title, content }) => {
            const { data, error } = await supabase
                .from("notes")
                .update({ title, content })
                .eq("id", id)
                .select()
                .single()

            if (error) throw error
            return data
        },

        onSuccess: (updatedNote) => {
            // 🔥 обновляем кеш списка заметок
            queryClient.invalidateQueries({ queryKey: ["notes"] })
            queryClient.invalidateQueries({ queryKey: ["note", updatedNote.id] })
        },
    })
}