import "./themeToggle.css"
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleChange = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <label className="themeToggle" aria-label="Переключить тему">
            <input
                className="themeToggle-checkbox visually-hidden"
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleChange}
                aria-checked={theme === "dark"}
            />
            <span className="slider" />
        </label>
    );
};

export default ThemeToggle;