import styles from './profile.module.css';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { hideTaskList, showTaskList } from '../../components/redux/taskListSlice';
import supabase from '../../utils/supabase';

import Header from '../../components/header/Header';
import Folder from '../../components/folder/Folder';
import Note from '../../components/note/Note';
import TaskListsContainer from '../../components/taskListsContainer/TaskListsContainer';
import WorkspaceSwitcher from '../../components/workspaceSwitcher/WorkspaceSwitcher';
import Modal from '../../components/ui/modals/Modal';
import FolderTitleOutput from '../../components/folderTitleOutput/FolderTitleOutput';
import CreateEntityButton from '../../components/createEntityButton/CreateEntityButton';
import EntityList from "../../components/entityList/EntityList"

import useNotes from '../../hooks/useNotes';
import useFolders from '../../hooks/useFolders';
import useFolder from '../../hooks/useFolder';

import Loader from '../../components/ui/loader/Loader';

export default function Profile() {
    const { id, folderId } = useParams();
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();

    // const isMobile = window.innerWidth < 768;
    const isMobile = true;
    const { data: notes } = useNotes(folderId)
    const { data: folders } = useFolders(folderId)
    const { data: folder } = useFolder(folderId || null)

    const [startTouchX, setStartTouchX] = useState(0);
    const [translate, setTranslate] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    const [shouldRenderGoBack, setShouldRenderGoBack] = useState(!!folderId);
    const [isExiting, setIsExiting] = useState(false);;


    useEffect(() => {
        if (folderId) {
            setShouldRenderGoBack(true);
            setIsExiting(false);
        } else {
            setIsExiting(true);
            const timer = setTimeout(() => {
                setShouldRenderGoBack(false);
            }, 300); // Время анимации из CSS
            return () => clearTimeout(timer);
        }
    }, [folderId])

    const dispatch = useDispatch();
    const taskListState = useSelector(state => state.taskList.taskListShown);
    const { stack } = useSelector(state => state.modals);

    const dataToDisplay = [...(notes || []).map(note => ({ ...note, type: "note" })), ...(folders || []).map(folder => ({ ...folder, type: "folder" }))];
    const sortedDataToDisplay = [...dataToDisplay].sort(
        (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
    ).reverse()


    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                navigate('/error', {
                    state: { code: error.code, message: 'Помилка під час завантаження профілю' },
                });
                return;
            }

            setProfile(data);
        };

        fetchProfile();
    }, [id, navigate]);

    if (!profile) return <Loader variant="big"></Loader>;

    const wrapper = document.querySelector('.profileContentWrapper');

    const baseTranslate =
        taskListState && wrapper
            ? -wrapper.offsetWidth
            : 0;
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
                    <div className={styles.mainPanel}>
                        <div className={styles.subHeder}>
                            {shouldRenderGoBack && (
                                <button
                                    className={`${styles.goBackButton} ${isExiting ? styles.fadeOut : ''}`}
                                    onClick={() => navigate(-1)}
                                >
                                    <svg width={'30px'} height={'30px'}>
                                        <use href='/icons/go-back-icon.svg' width={'30px'} height={"30px"}></use>
                                    </svg>
                                </button>
                            )}
                            <CreateEntityButton folderId={folderId} />
                            {shouldRenderGoBack && (
                                <FolderTitleOutput
                                    title={folder?.title}
                                    isExiting={isExiting} />
                            )}
                        </div>

                        <EntityList>
                            {sortedDataToDisplay.map((item) => {
                                if (item.type === "folder") {
                                    return <Folder key={item.id} id={item.id} title={item.title} description={item.description} creationDate={item.created_at} />
                                }
                                if (item.type === "note") {
                                    return <Note key={item.id} note={item} linkPreviewId={item.link_preview_id} />
                                }
                            })}
                        </EntityList>

                    </div>

                    {isMobile && <TaskListsContainer isMobile={isMobile} />}
                </div>
            </div>
        </section >
    );
}
