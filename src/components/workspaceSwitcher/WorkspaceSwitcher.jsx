import "./WorkspaceSwitcher.css";
import { showTaskList } from "../redux/taskListSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";

export default function WorkspaceSwitcher({ onTrigger, className }) {

    const timerRef = useRef(null);

    return (
        <div className={`workspaceSwitcher ${className ? className : ''}`}

            onDragEnter={() => {
                if (!timerRef.current) {
                    timerRef.current = setTimeout(() => {
                        onTrigger()
                    }, 700)
                }
            }}

            onDragLeave={() => {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                    timerRef.current = null;
                }
            }}

            onDragOver={(e) => {
                e.dataTransfer.dropEffect = "move";
                e.preventDefault();
            }}
        >

            <svg className="workspaceswitcher-icon" width="40px" height="40px">
                <use href="/icons/switcher-icon.svg#switcher-icon"></use>
            </svg>

        </div>
    )
}