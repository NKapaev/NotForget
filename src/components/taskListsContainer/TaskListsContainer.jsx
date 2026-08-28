import "./taskListsContainer.css"

import { hideTaskList, showTaskList } from "../redux/taskListSlice"
import { useDispatch } from "react-redux"
import { openModal } from "../redux/modalsSlice"
import Button from "../ui/button/Button"
import { useParams } from "react-router-dom"
import supabase from "../../utils/supabase"
import TaskList from "../taskList/TaskList"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"

export default function TaskListsContainer() {
    const { taskListShown } = useSelector(state => state.taskList);
    const dispatch = useDispatch()

    const { id } = useParams()

    const { data: taskLists } = useQuery({
        queryKey: ['taskLists', id], queryFn: async () => {
            const { data, error } = await supabase
                .from("taskLists")
                .select("*")

            if (error) throw error
            return data
        }
    })

    return (
        <div className={`task-lists-container ${taskListShown ? "open" : ""}`}
            onDragEnter={(e) => {
                dispatch(showTaskList())
            }}

            onDragLeave={(e) => {
                if (e.currentTarget && !e.currentTarget.contains(e.relatedTarget)) {
                    dispatch(hideTaskList())
                }
            }}
        >
            <button className="taskListController"
                onClick={(e) => {
                    e.target.blur()
                    taskListShown ? dispatch(hideTaskList()) : dispatch(showTaskList())
                }}>
                <svg className="taskListControllerIcon" fill="var(--accent-color)" width={20} height={20}>
                    <use href="/icons/list.svg#listIcon" ></use>
                </svg>
            </button>
            <Button aria-label="Створити новий список задач" className="add-tasklist-button" onClick={(e) => {
                dispatch(openModal({ type: "create", entity: "tasklist", modalId: crypto.randomUUID() }))
            }}>{<svg className="tasklist-add-icon" width="20px" height="20px">
                <use href="/icons/plus-icon.svg#plus" fill="var(--blue)" width="20px" height="20px"></use>
            </svg>} Новий список </Button>


            <div className="scrollableTaskLists">
                {taskLists?.map((taskList) => {
                    return (
                        <TaskList key={taskList.id} taskList={taskList} id={taskList.id} />
                    )
                })}
            </div>
        </div>
    )
}