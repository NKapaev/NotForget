import { useQuery } from '@tanstack/react-query';
import supabase from '../utils/supabase';

export default function useNote(noteId) {
    return useQuery({
        queryKey: ['note', noteId],
        queryFn: async () => {
            await supabase.from("notes").eq("id", noteId)
                .select()
                .single()
        },


        // ваша функция получения заметки
        enabled: !!noteId // запрос только если есть noteId
    });
}