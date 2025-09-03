import './taskList.css'

import { useSelector, useDispatch } from 'react-redux'
import { showTaskList } from '../redux/taskListSlice'

export default function TaskList({ className }) {

    return (
        <div className={`task-list ${className ? className : ""}`}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam veritatis dolore ipsam. Expedita corporis earum nobis inventore, a hic adipisci?</p>
        </div>
    )
}