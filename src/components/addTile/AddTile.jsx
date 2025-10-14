import useAddFolder from "../../hooks/useAddFolder"
import useAddNote from "../../hooks/useAddNote"
import { useModal } from "../../context/ModalProvider"

import Form from "../form/Form"
import Button from "../ui/button/Button"


export default function AddTile({ entity, folderId }) {
    const { openModal, closeModal } = useModal()
    const addFolder = useAddFolder()
    const addNote = useAddNote()

    const handleSubmit = (formData) => {
        if (entity === "folder") {
            addFolder.mutateAsync({ name: formData.name, description: formData.description })
            closeModal()
        }
        if (entity === "note") {
            addNote.mutateAsync({ content: formData.note, folderId })
            closeModal()
        }
    }


    if (entity === "folder") {
        return (
            <li className="addFolder tile" onClick={(e) => {
                if (e.detail === 2) {
                    e.preventDefault()
                    openModal(<Form onSubmit={handleSubmit} fields={[{ name: "name", type: "text", placeholder: "Folder name" }, { name: "description", type: "text", placeholder: "Folder description" }]} >
                        <div className="form-button-container">
                            <Button type="submit">Створити</Button>
                        </div>
                    </Form>)
                }
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
                if (e.detail === 2) {
                    e.preventDefault()
                    openModal(<Form onSubmit={handleSubmit} fields={[{ name: "note", type: "text", placeholder: "Enter note" }]}>
                        <div className="form-button-container">
                            <Button type="submit">Створити</Button>
                        </div>
                    </Form>)
                }
            }}>
                <svg className="svg" width="100px" height="100px">
                    <use className="use" href="/icons/plus-icon.svg#plus" width="100px" height="100px" color="var(--blue)" fill="var(--blue)" stroke="#000"></use>
                </svg>
            </li>
        )
    }
}