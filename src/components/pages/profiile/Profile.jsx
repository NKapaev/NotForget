import "./profile.css"

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import supabase from '../../../utils/supabase'

import Header from '../../header/Header'
import TaskList from "../../taskList/TaskList"
import FolderList from '../../folderList/FolderList'
import NoteList from '../../noteList/NoteList'
import { toggleTaskListOpen } from "../../redux/taskListSlice"

export default function Profile() {
    const dispatch = useDispatch()
    const taskList = useSelector((state) => state.taskList)
    console.log(taskList)
    const { id, folderId } = useParams()
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()

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

    return (
        <section className="profile">
            <Header userData={profile} />


            <div className="container profile-container">
                <TaskList className={taskList.taskListShown ? "open" : ""}></TaskList>

                <button onClick={(e) => {
                    dispatch(toggleTaskListOpen())
                }}>Открыть таск лист</button>

                {folderId ? (
                    <NoteList folderId={folderId} userId={profile.id} />
                ) : (
                    <FolderList userId={profile.id} />
                )}
            </div>
        </section>
    )
}