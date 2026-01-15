import "./inputField.css"

export default function InputField({ className, type = "text", name, error, placeholder, value, onChange }) {
    return (
        <>
            <div className={`input ${className ? className : ""}`}>

                {type !== "textarea" ? <input value={value} onChange={onChange} placeholder=" " name={name} id={placeholder} type={type} /> : <textarea rows="5" value={value} onChange={onChange} placeholder=" " name={name} id={placeholder} type={type}></textarea>}
                <label htmlFor={placeholder}>{placeholder}</label>
            </div>
            {error && <p className="field-error">{error}</p>}
        </>
    )
}