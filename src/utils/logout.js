import supabase from "./supabase";

export default async function logOut(navigate) {

    const { error } = await supabase.auth.signOut()
    if (!error) navigate('/')
}