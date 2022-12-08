import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos } from "../features/todosSlice";
import styles from "./styles/Todos.module.css";
import Todo from "./Todo";
const Todos = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.todos);
    const error = useSelector((state) => state.todos.error);
    const loading = useSelector((state) => state.todos.loading);
    const [text, setText] = useState('')
  
    const handleTextEdit = (e) => {
      setText(e.target.value)
    }
    const handleAddTodo = () => {
      dispatch(addTodo({text}))
      setText('')
    }
    useEffect(() => {
      dispatch(fetchTodos())
    }, [dispatch]);

    if (loading) {
      return <h1>...LOADING</h1>;
    }
  
    if (error) {
      return <h1>error: {error}</h1>;
    }

  return (
    <div className={styles.mainBlock}>
      <div className={styles.addBlock}>
        <input onChange={handleTextEdit} className={styles.input} type="text" />
        <button onClick={handleAddTodo} className={styles.addButton}>Добавить</button>
      </div>
      <div className={styles.todoBlock}>
        {todos.map((todo) => {
          return (
            <Todo
              key={todo._id}
            id={todo._id}
            userId={todo.user}
              text={todo.text}
              completed={todo.completed}
              loading={todo.loading}
              deleted={todo.deleted}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todos;
