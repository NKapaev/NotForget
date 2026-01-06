import "./form.css"

import Button from "../ui/button/Button"
import InputField from "../ui/inputField/InputField"
import validateField from "../../utils/validateField"
import { useState } from "react"

export default function Form({ className, fields, onSubmit, initialValues = {}, validate = true, children }) {

    const [formData, setFormData] = useState(
        Object.fromEntries(
            fields.map(field => [
                field.name,
                initialValues[field.name] ?? ""
            ])
        )
    );
    const [errors, setErrors] = useState({})

    function handleChange(e) {
        const { name, value } = e.target;
        const nextData = { ...formData, [name]: value };

        setFormData(nextData);

        if (validate) {
            const errorMsg = validateField(name, value, nextData);
            setErrors(prev => ({ ...prev, [name]: errorMsg }));


            //REWRITE CONDITIONS
            // Дополнительно: если изменился password — пересчитай confirmPassword
            if (name === "password" && nextData.confirmPassword) {
                const confirmError = validateField(
                    "confirmPassword",
                    nextData.confirmPassword,
                    nextData
                );
                setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
            }
            // Дополнительно: если изменился confirmPassword — пересчитай password
            if (name === "confirmPassword" && nextData.password) {
                const passwordError = validateField(
                    "password",
                    nextData.password,
                    nextData
                );
                setErrors(prev => ({ ...prev, password: passwordError }));
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form className={className ? className : ""} onSubmit={handleSubmit}>

            {fields.map(({ type, name, placeholder, value }) => {
                return < InputField key={name} name={name} type={type} placeholder={placeholder} value={value ? value : formData[name]} onChange={handleChange} error={errors[name]} />
            })}
            {children}
        </form>
    )
}