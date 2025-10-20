import "./profile.css"

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../context/ModalProvider"
import useAddTaskList from "../../../hooks/useAddTaskList"
import supabase from '../../../utils/supabase'

import Header from '../../header/Header'
import TaskList from "../../taskList/TaskList"
import FolderList from '../../folderList/FolderList'
import NoteList from '../../noteList/NoteList'
import Form from "../../form/Form"
import Button from "../../ui/button/Button"
import TaskListsContainer from "../../taskListsContainer/TaskListsContainer"

export default function Profile() {
    const { openModal, closeModal } = useModal()

    const { id, folderId } = useParams()
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()
    const addTaskList = useAddTaskList()

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                navigate('/error', {
                    state: { code: error.code, message: 'Ошибка при загрузке профиля' },
                })
                return
            }

            setProfile(data)
        }

        fetchProfile()
    }, [id, navigate])

    if (!profile) return <p>Загрузка...</p>

    function handleSubmit(formData) {
        console.log(formData)
        addTaskList.mutateAsync({ name: formData.name })
        closeModal()
    }


    return (
        <section className="profile">
            <Header userData={profile} />


            <div className="container profile-container">
                <TaskListsContainer></TaskListsContainer>

                <button onClick={(e) => {
                    openModal(<Form onSubmit={handleSubmit} fields={[{ name: "name", type: "text", placeholder: "Task list name" }]} >
                        <div className="form-button-container">
                            <Button type="submit">Створити</Button>
                        </div>
                    </Form>)
                }}>Создать таск лист</button>





                {folderId ? (
                    <NoteList folderId={folderId} userId={profile.id} />
                ) : (
                    <FolderList userId={profile.id} />
                )}
            </div>
        </section>
    )
}