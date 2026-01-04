// import useAddFolder from "../../hooks/useAddFolder"
// import useAddNote from "../../hooks/useAddNote"
// import { useModal } from "../../context/ModalProvider"

// import Form from "../form/Form"
// import Button from "../ui/button/Button"
import { useDispatch } from "react-redux"
import { openModal } from "../redux/modalsSlice"


export default function AddTile({ entity, folderId }) {
    // const { openModal, closeModal } = useModal()
    // const addFolder = useAddFolder()
    // const addNote = useAddNote()

    const dispatch = useDispatch();



    if (entity === "folder") {
        return (
            <li className="addFolder tile" onClick={(e) => {

                e.preventDefault()
                dispatch(openModal({ type: 'create', entity: 'folder', id: crypto.randomUUID() }))

            }}>
                <svg className="svg" width="100px" height="100px">
                    <use className="use" href="/icons/plus-icon.svg#plus" width="100px" height="100px" color="var(--blue)" fill="var(--blue)" stroke="#000"></use>
                </svg>
            </li>
        )
    }

    if (entity === "note") {
        return (
            <li className="addFolder tile" onClick={(e) => {

                e.preventDefault()
                dispatch(openModal({ type: 'create', entity: 'note', folderId, id: crypto.randomUUID() }))

            }}>
                <svg className="svg" width="100px" height="100px">
                    <use className="use" href="/icons/plus-icon.svg#plus" width="100px" height="100px" color="var(--blue)" fill="var(--blue)" stroke="#000"></use>
                </svg>
            </li>
        )
    }
}