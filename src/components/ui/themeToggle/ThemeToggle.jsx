import "./themeToggle.css";
import { useTheme } from "../../../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <label className={`themeToggle ${className}`} aria-label="Переключить тему">
            <input
                className="themeToggle-checkbox visually-hidden"
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                aria-checked={theme === "dark"}
            />
            <span className="slider" />
        </label>
    );
}