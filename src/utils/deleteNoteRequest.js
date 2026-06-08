import supabase from "./supabase";

export async function deleteNoteRequest(id) {
    const { error } = await supabase
        .from("notes")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
}