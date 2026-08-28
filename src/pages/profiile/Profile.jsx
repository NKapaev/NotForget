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
import Modal from '../../components/ui/modals/Modal';
import FolderTitleOutput from '../../components/folderTitleOutput/FolderTitleOutput';
import CreateEntityButton from '../../components/createEntityButton/CreateEntityButton';
import EntityList from "../../components/entityList/EntityList"
import FindButton from '../../components/findButton/FindButton';

import useNotes from '../../hooks/useNotes';
import useFolders from '../../hooks/useFolders';
import useFolder from '../../hooks/useFolder';
import useMoveNote from '../../hooks/useMoveNote';

import Loader from '../../components/ui/loader/Loader';
import Toast from '../../components/toast/Toast';
import { useToast } from '../../components/toast/toastContext';

export default function Profile() {
    const { id: profileId, folderId } = useParams();
    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();
    const moveNote = useMoveNote()

    const { data: notes } = useNotes(folderId)
    const { data: folders } = useFolders(folderId)
    const { data: folder } = useFolder(folderId || null)

    const [shouldRenderGoBack, setShouldRenderGoBack] = useState(!!folderId);
    const [isExiting, setIsExiting] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchMode, setSearchMode] = useState('folder');

    const [globalData, setGlobalData] = useState([]);
    const [isGlobalLoading, setIsGlobalLoading] = useState(false);

    const { toasts } = useToast()


    useEffect(() => {
        const fetchGlobalSearch = async () => {
            if (searchMode === "all" && searchQuery.trim() !== "") {
                setIsGlobalLoading(true);

                // Робимо два запити паралельно: по нотатках і по папках
                const [notesRes, foldersRes] = await Promise.all([
                    supabase
                        .from('notes')
                        .select('*')
                        .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`),
                    supabase
                        .from('folders')
                        .select('*')
                        .or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`),
                ]);

                const combined = [
                    ...(notesRes.data || []).map(n => ({ ...n, type: 'note' })),
                    ...(foldersRes.data || []).map(f => ({ ...f, type: 'folder' }))
                ];

                setGlobalData(combined);
                setIsGlobalLoading(false);
            } else {
                setGlobalData([]); // Очищуємо, якщо режим змінився або запит порожній
            }
        };

        fetchGlobalSearch();
    }, [searchMode, searchQuery, profileId]);


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
    const { taskListShown, wasClosedBeforeDrag } = useSelector(state => state.taskList);
    const { stack } = useSelector(state => state.modals);

    const dataToDisplay = [...(notes || []).map(note => ({ ...note, type: "note" })), ...(folders || []).map(folder => ({ ...folder, type: "folder" }))];
    const sortedDataToDisplay = [...dataToDisplay].sort(
        (a, b) => new Date(a.updated_at) - new Date(b.updated_at)
    ).reverse()

    const baseData = searchMode === "all" ? globalData : sortedDataToDisplay;

    const filteredData = searchQuery
        ? baseData.filter(item =>
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : sortedDataToDisplay;


    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', profileId)
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
    }, [profileId, navigate]);

    if (!profile) return <Loader variant="big"></Loader>;

    return (

        <section className="profile">
            <>
                {stack.map(modal => (
                    < Modal key={modal.modalId} modal={modal} />
                ))}
            </>
            <Header userData={profile} />
            <Toast toasts={toasts} />

            <div className={`container ${styles.profileContainer} ${taskListShown ? styles.taskListOpen : ""}`}

                onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    const noteId = e.dataTransfer.getData("text/plain")
                    document.body.classList.remove("dragging")
                    if (!noteId) return
                    moveNote.mutate({ noteId, folderId: folderId || null })
                    if (wasClosedBeforeDrag) {
                        dispatch(hideTaskList());
                    } else {
                        dispatch(showTaskList());
                    }
                }}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
            >
                {/* {taskListState ? (
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
                )} */}
                <div className={styles.subHeader}>
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
                    <FindButton onSearch={setSearchQuery} onModeChange={setSearchMode}></FindButton>
                    {shouldRenderGoBack && (
                        <FolderTitleOutput
                            title={folder?.title}
                            isExiting={isExiting} />
                    )}
                </div>

                <EntityList>
                    {filteredData.map((item) => {
                        if (item.type === "folder") {
                            return <Folder key={item.id} folder={item} displayMod={profile.displayMod} />
                        }
                        if (item.type === "note") {
                            return <Note key={item.id} note={item} linkPreviewId={item.link_preview_id} displayMod={profile.displayMod} />
                        }
                    })}

                </EntityList>
                <TaskListsContainer />

            </div>
        </section >
    );
}
