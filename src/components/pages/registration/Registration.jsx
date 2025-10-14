import supabase from "../../../utils/supabase"
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Form from "../../form/Form";
import Button from "../../ui/button/Button";

import "./registration.css"

export default function Registration() {

    const userHeight = window.innerHeight
    const navigate = useNavigate()
    const { signUpNewUser, error } = useAuth()
    const [formError, setFormError] = useState(null)

    const handleRegistration = async (formData) => {
        console.log(formData)

        if (formData.password !== formData.confirmPassword) {
            setFormError("Пароль не співпадає")
        } else {
            setFormError(null)
            try {
                const user = await signUpNewUser(formData.email, formData.password)
                navigate("/confirmEmail")
                console.log(user)
            } catch (_) {

            }
        }

    }


    return (
        <section className="registration-section" style={{ height: userHeight }}>
            <div className="container registration-container">
                <div className="registration-form-wrapper">
                    <Form className="registration-form" fields={[{ name: "email", type: "email", placeholder: "Email" }, {
                        name: "password", type: "password", placeholder: "Password"
                    }, {
                        name: "confirmPassword", type: "password", placeholder: "Confirm password"
                    }]} onSubmit={handleRegistration} >
                        <div className="form-button-container">
                            <Button type="submit">Зареєструватись</Button>
                        </div>
                    </Form>
                    {formError ? <p className="form-error">{formError}</p> : ""}
                </div>
            </div>
        </section>
    )
}

