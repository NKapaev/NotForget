import supabase from "../../../utils/supabase"
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Form from "../../form/Form";

import "./registration.css"

export default function Registration() {
    const userHeight = window.innerHeight
    const navigate = useNavigate()

    const { signUpNewUser, error } = useAuth()

    const handleRegistration = async (formData) => {
        try {
            const user = await signUpNewUser(formData.email, formData.password)
            navigate("/confirmEmail")
            console.log(user)
        } catch (_) {

        }
    }


    return (
        <section className="registration-section" style={{ height: userHeight }}>
            <div className="container registration-container">
                <div className="registration-form-wrapper">
                    <Form className="registration-form" buttonText="Register" fields={[{ name: "email", type: "email", placeholder: "Email" }, {
                        name: "password", type: "password", placeholder: "Password"
                    }]} onSubmit={handleRegistration} />
                </div>
            </div>
        </section>
    )
}

