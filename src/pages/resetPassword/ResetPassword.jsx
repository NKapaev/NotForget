import Form from "../../components/form/Form"
import Button from "../../components/ui/button/Button"
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();

    return (
        <section className="registration-section" style={{ height: window.innerHeight }}>
            <div className="container registration-container">
                <div className="registration-form-wrapper">
                    <h2 className="registration-title">Відновлення паролю</h2>
                    <Form className="registration-form" fields={[{
                        name: "password", type: "password", placeholder: "Пароль"
                    }, {
                        name: "confirmPassword", type: "password", placeholder: "Підтвердіть пароль"
                    }]} onSubmit={async (formData) => {
                        const { error } = await supabase.auth.updateUser({
                            password: formData.password
                        });
                        if (error) { throw error }
                        else {
                            navigate("/");
                        }
                    }} >

                        <div className="form-button-container">
                            <Button type="submit">Відновити</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )
}