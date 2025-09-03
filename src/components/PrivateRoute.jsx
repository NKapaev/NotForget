import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

export default function PrivateRoute() {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (!error) {
                setSession(data.session);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) return <p>Загрузка...</p>;

    return session ? <Outlet /> : <Navigate to="/" />;
}