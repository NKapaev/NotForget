import "./inputField.css"

export default function InputField({ className, type = "text", name, placeholder, value, onChange }) {
    return (
        <div className={`input ${className ? className : ""}`}>
            <input value={value} onChange={onChange} placeholder="" name={name} id={placeholder} type={type} />
            <label htmlFor={placeholder}>{placeholder}</label>
        </div>
    )
}