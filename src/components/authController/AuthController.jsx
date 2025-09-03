import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";

export default function AuthController() {
    const navigate = useNavigate()


    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (session) {
                navigate(`/profile/${session.user.id}`);
            } else {
                navigate("/");
            }
        }
        checkAuth()

    }, [navigate])

}