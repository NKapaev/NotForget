import "./dropdown.css";
import { useState } from "react";

export default function Dropdown({
    options = [],
    disabled = false,
    width,
    title,
    className,
    value = options[0],
    onChange,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const renderSelectedValue = () => {
        if (typeof value === "object") {
            return (
                <div className="option-container">
                    <div
                        className="calendar-color"
                        style={{ backgroundColor: value.color }}
                    ></div>
                    <p>{value.title}</p>
                </div>
            );
        }
        return <p>{value}</p>;
    };

    return (
        <div
            className={`dropdown-container ${className} ${disabled ? "disabled" : ""
                }`}
            style={width ? { width } : {}}
        >
            {title && <h2 className="input-label">{title}</h2>}
            <div
                className={`dropdown ${isOpen ? "isOpen" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {renderSelectedValue()}
                <svg
                    width={16}
                    height={16}
                    className="dropdown-icon"
                    fill={"none"}
                    stroke={"#323749"}
                    style={isOpen ? { transform: "rotate(180deg)" } : {}}
                >
                    <use href="icons/chevron-down.svg#chevron-down"></use>
                </svg>
            </div>
            {isOpen && (
                <ul className="list dropdown-options ">
                    {options.map((option) =>
                        typeof option === "object" ? (
                            <li
                                key={option.id}
                                className={`dropdown-option ${option.id === value?.id ? "selected-option" : ""
                                    }`}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            >
                                <div className="option-container">
                                    <div
                                        className="calendar-color"
                                        style={{ backgroundColor: option.color }}
                                    ></div>
                                    <p>{option.title}</p>
                                </div>
                            </li>
                        ) : (
                            <li
                                key={option}
                                className={`dropdown-option ${option === value ? "selected-option" : ""
                                    }`}
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                            >
                                <div className="option-container">
                                    <p>{option}</p>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            )}
        </div>
    );
}
