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
            <div className="slider">
                <div className="slider-circle">
                    <svg width={24} height={24}>
                        <use className="themeToggleIcon moon-icon" href="/icons/moon-icon.svg#moon-icon"></use>
                        <use className="themeToggleIcon sun-icon" href="/icons/sun-icon.svg#sun-icon"></use>
                    </svg>
                </div>
            </div>
        </label>
    );
}