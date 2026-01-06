import { useDispatch } from "react-redux"
import { openModal } from "../redux/modalsSlice"

export default function AddTile({ entity, folderId }) {

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault()

        const modalPayload = {
            type: 'create', entity, modalId: crypto.randomUUID()
        }

        if (entity === 'note') {
            modalPayload.folderId = folderId
        }

        dispatch(openModal(modalPayload))
    }

    return (
        <li className="addFolder tile" onClick={handleClick}>
            <svg className="svg" width="100px" height="100px">
                <use className="use" href="/icons/plus-icon.svg#plus" width="100px" height="100px" color="var(--blue)" fill="var(--blue)" stroke="#000"></use>
            </svg>
        </li>
    )
}
