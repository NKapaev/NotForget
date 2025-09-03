import "./form.css"

import Button from "../ui/button/Button"
import InputField from "../ui/inputField/InputField"
import { useState } from "react"

export default function Form({ className, fields, onSubmit, buttonText = "Sent", children }) {

    const [formData, setFormData] = useState(
        Object.fromEntries(fields.map(field => [field.name, ""]))
    )

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form className={className ? className : ""} onSubmit={handleSubmit}>

            {fields.map(({ type, name, placeholder }) => {
                return < InputField key={name} name={name} type={type} placeholder={placeholder} value={formData[name]} onChange={handleChange} />
            })}

            <div className="button-container"><Button className="form-button" type="submit">{buttonText}</Button>{children}</div>
        </form>
    )
}