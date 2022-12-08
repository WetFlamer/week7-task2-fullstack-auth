import React from 'react';
import { useDispatch } from 'react-redux';
import { completeTodo, deleteTodo } from '../features/todosSlice';
import styles from './styles/Todos.module.css'
const Todo = ({ id, text, completed, loading, deleted}) => {
    const dispatch = useDispatch()

const handleChecked = () => {
  dispatch(completeTodo({id, completed}))
}

const handleDelete = () => {
  dispatch(deleteTodo({id, deleted}))
}

if(loading) {
  return '-_-'
}
if(deleted) {
  return ':('
} 
    return (
        <div className={styles.todos}>
            <div>
                <input  onChange={handleChecked} checked={completed} className={styles.inputCheck} type="checkBox" />
            </div>
            <div className={styles.todoText}>{text}</div>
            <div>
                <button onClick={handleDelete} className={styles.deleteButton}>X</button>
            </div>
        </div>
    );
};

export default Todo;