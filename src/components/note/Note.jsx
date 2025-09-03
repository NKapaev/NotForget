import { useLocation, useNavigate } from "react-router-dom"
import useDeleteNote from "../../hooks/useDeleteNote";
import Button from "../ui/button/Button";

export default function Note({ id, content }) {

    const mutation = useDeleteNote();

    return (
        <li draggable className="folder tile"

            onClick={(e) => {
                if (e.detail === 2) {

                }
            }}

            onDragStart={(e) => {

            }}
        >
            <Button className="delete-button" onClick={() => {
                mutation.mutateAsync(id)
            }}>
                <img width={"40px"} className="delete-button-icon" src="/icons/trash-icon.svg#trash-icon" alt="" />
            </Button>
            <p>{content}</p>
        </li>
    )
}