import { useState } from "react"
import supabase from "../../../utils/supabase"
import { useNavigate } from "react-router-dom";



export default function Registration() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [registrationError, setRegistrationError] = useState("")
    const navigate = useNavigate();

    async function signUpNewUser(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: '/confirmEmail',
            },
        })

        if (!error) {
            navigate("/confirmEmail")
        } else {
            alert(error.message)
        }
    }

    return (
        <>
            I am registration page

            <form action="" onSubmit={(e) => {
                e.preventDefault()
                signUpNewUser(email, password)

            }}>
                <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
                <input type="text" onChange={(e) => { setPassword(e.target.value) }} />
                <button>Register</button>
            </form>
        </>
    )
}