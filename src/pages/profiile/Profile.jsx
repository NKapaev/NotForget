import styles from './profile.module.css';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { hideTaskList, showTaskList } from '../../components/redux/taskListSlice';
import supabase from '../../utils/supabase';

import Header from '../../components/header/Header';
import FolderList from '../../components/folderList/FolderList';
import NoteList from '../../components/noteList/NoteList';
import TaskListsContainer from '../../components/taskListsContainer/TaskListsContainer';
import WorkspaceSwitcher from '../../components/workspaceSwitcher/WorkspaceSwitcher';
import Modal from '../../components/ui/modals/Modal';

import Loader from '../../components/ui/loader/Loader';

export default function Profile() {
    const { id, folderId } = useParams();
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    // const isMobile = window.innerWidth < 768;
    const isMobile = true;

    const [startTouchX, setStartTouchX] = useState(0);
    const [translate, setTranslate] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const dispatch = useDispatch();
    const taskListState = useSelector(state => state.taskList.taskListShown);
    const { stack } = useSelector(state => state.modals);

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                navigate('/error', {
                    state: { code: error.code, message: 'Ошибка при загрузке профиля' },
                });
                return;
            }

            setProfile(data);
        };

        fetchProfile();
    }, [id, navigate]);

    if (!profile) return <Loader variant="big"></Loader>;

    const baseTranslate =
        taskListState === false
            ? 0
            : -document.querySelector('.profileContentWrapper').offsetWidth;
    const totalTranslate = baseTranslate + translate;

    return (

        <section className="profile">
            <>
                {stack.map(modal => (
                    < Modal key={modal.modalId} modal={modal} />
                ))}
            </>
            <Header userData={profile} />

            <button
                className={`${styles.showTaskListButton} ${styles.workspaceController
                    } ${taskListState ? styles.none : ''}`}
                onClick={() => {
                    dispatch(showTaskList());
                }}
            >
                <svg width={'32px'} height={'32px'}>
                    <use href="/icons/tasklist-icon.svg#tasklist-icon"></use>
                </svg>
            </button>

            <button
                className={`${styles.hideTaskListButton} ${styles.workspaceController
                    } ${taskListState ? '' : styles.none}`}
                onClick={() => {
                    dispatch(hideTaskList());
                }}
            >
                <svg width="25px" height="25px">
                    <use href="/icons/folder-icon.svg#folder"></use>
                </svg>
            </button>

            <div className={`container ${styles.profileContainer}`}>
                {taskListState ? (
                    <WorkspaceSwitcher
                        className={'toLeft'}
                        onTrigger={() => {
                            dispatch(hideTaskList());
                        }}
                    ></WorkspaceSwitcher>
                ) : (
                    <WorkspaceSwitcher
                        className={'toRight'}
                        onTrigger={() => {
                            dispatch(showTaskList());
                        }}
                    ></WorkspaceSwitcher>
                )}

                <div
                    className={`profileContentWrapper ${styles.profileContentWrapper}`}
                    style={{
                        transform: `translateX(${totalTranslate}px)`,
                        transition: 'all linear 0.3',
                    }}
                    onTouchStart={e => {
                        setStartTouchX(e.touches[0].clientX);
                        setIsSwiping(true);
                    }}
                    onTouchMove={e => {
                        if (!isSwiping) return;

                        const deltaX = e.touches[0].clientX - startTouchX;

                        if (
                            (taskListState === false && deltaX < 0) ||
                            (taskListState === true && deltaX > 0)
                        ) {
                            setTranslate(deltaX);
                        }
                    }}
                    onTouchEnd={e => {
                        if (translate < -60) {
                            dispatch(showTaskList());
                            setIsSwiping(false);
                        } else if (translate > 60) {
                            dispatch(hideTaskList());
                            setIsSwiping(false);
                        }
                        setTranslate(0);
                    }}
                >
                    {/* <TaskListsContainer isMobile={isMobile ? true : false}></TaskListsContainer> */}

                    {folderId ? (
                        <>
                            {/* <Button className="go-back-button" onClick={() => {
                            navigate(`/profile/${id}`)
                        }}>
                            <svg className="back-button-icon" width="20px" height="20px">
                                <use href="/icons/arrow.svg#arrow"></use>
                            </svg>
                        </Button> */}

                            <NoteList folderId={folderId} userId={profile.id} />
                        </>
                    ) : (
                        <FolderList userId={profile.id} />
                    )}

                    {isMobile && <TaskListsContainer isMobile={isMobile} />}
                </div>
            </div>
        </section>
    );
}
