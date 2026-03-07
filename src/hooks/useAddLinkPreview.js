import supabase from "../utils/supabase";
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useAddLinkPreview() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ url, title, description, image }) => {
            supabase.from("link_previews").insert({
                url, title, description, image
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["link_previews"] })
        }
    })
}