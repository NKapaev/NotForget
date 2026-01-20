import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../utils/supabase";

import Loader from "./ui/loader/Loader";

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

    if (loading) return <Loader variant="big" />;

    return session ? <Outlet /> : <Navigate to="/" />;
}