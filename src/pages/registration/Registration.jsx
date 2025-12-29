import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Form from "../../components/form/Form";
import Button from "../../components/ui/button/Button";

import "./registration.css"

export default function Registration() {

    const userHeight = window.innerHeight
    const navigate = useNavigate()
    const { signUpNewUser, error } = useAuth()
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if (error) {
            setFormError(error)
        }
    }, [error])

    const handleRegistration = async (formData) => {

        if (formData.password !== formData.confirmPassword) {
            setFormError("Пароль не співпадає")
        } else {
            setFormError(null)
            try {
                const data = await signUpNewUser(formData.email, formData.password)

                // Если ошибки нет и пользователь создан
                if (data && !error) {
                    navigate("/confirmEmail")
                }
            } catch (err) {
                // Ошибка уже установлена в хуке и будет показана через useEffect
            }
        }

    }


    return (
        <section className="registration-section" style={{ height: userHeight }}>
            <div className="container registration-container">
                <div className="registration-form-wrapper">
                    <h2 className="registration-title">Реєстрація</h2>
                    <Form className="registration-form" fields={[{ name: "email", type: "email", placeholder: "Email" }, {
                        name: "password", type: "password", placeholder: "Пароль"
                    }, {
                        name: "confirmPassword", type: "password", placeholder: "Підтвердіть пароль"
                    }]} onSubmit={handleRegistration} >

                        {formError ? <p className="form-error">{formError}</p> : ""}

                        <div className="form-button-container">
                            <Button type="submit">Зареєструватись</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )
}

