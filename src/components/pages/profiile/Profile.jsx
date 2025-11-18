import "./profile.css"

import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useAddTaskList from "../../../hooks/useAddTaskList"
import supabase from '../../../utils/supabase'

import Header from '../../header/Header'
import FolderList from '../../folderList/FolderList'
import NoteList from '../../noteList/NoteList'
import TaskListsContainer from "../../taskListsContainer/TaskListsContainer"
import Button from "../../ui/button/Button"

import Loader from "../../ui/loader/Loader"

export default function Profile() {
    const { id, folderId } = useParams()
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()
    const isMobile = window.innerWidth < 768;

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

    if (!profile) return <Loader />

    return (
        <section className="profile">
            <Header userData={profile} />

            <div className="container profile-container">
                {/* <TaskListsContainer isMobile={isMobile ? true : false}></TaskListsContainer> */}



                {folderId ? (
                    <>
                        <Button className="go-back-button" onClick={() => {
                            navigate(`/profile/${id}`)
                        }}>
                            <svg className="back-button-icon" width="20px" height="20px">
                                <use href="/icons/arrow.svg#arrow"></use>
                            </svg>
                        </Button>
                        <NoteList folderId={folderId} userId={profile.id} />
                    </>
                ) : (
                    <FolderList userId={profile.id} />
                )}

                {isMobile &&
                    <TaskListsContainer isMobile={isMobile ? true : false}>
                        <p>This is mobile device</p>
                    </TaskListsContainer>
                }

            </div>
        </section>
    )
}