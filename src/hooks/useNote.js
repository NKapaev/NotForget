import { useQuery } from '@tanstack/react-query';
import supabase from '../utils/supabase';

export default function useNote(noteId) {
    return useQuery({
        queryKey: ['note', noteId],
        enabled: !!noteId,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("notes")
                .select("*")
                .eq("id", noteId)
                .single()

            if (error) throw error
            return data
        },
    })
}