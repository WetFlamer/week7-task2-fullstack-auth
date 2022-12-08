import { useDispatch, useSelector } from "react-redux";
import { completeTodo, deleteTodo } from "../features/todosSlice";
import styles from "./styles/Todos.module.css";
const Todo = ({ id, userId, text, completed, loading, deleted }) => {
  const user = useSelector((state) => state.users.users);
  const userI = useSelector((state) => state.application.id);
  const dispatch = useDispatch();

  const handleChecked = () => {
    dispatch(completeTodo({ id, completed }));
  };
  console.log(userI, userId);
  const handleDelete = () => {
    dispatch(deleteTodo({ id, deleted }));
  };
  if (loading) {
    return "-_-";
  }
  if (deleted) {
    return ":(";
  }
  return (
    <div className={styles.todos}>
      <div>
        {userI === userId ? (
          <input
            onChange={handleChecked}
            checked={completed}
            className={styles.inputCheck}
            type="checkBox"
          />
        ) : (
          null
        )}
      </div>
{userI === userId ? <div className={styles.todoText}>{text}</div> : null}
      <div>
        {userI === userId ? <button onClick={handleDelete} className={styles.deleteButton}>
          X
        </button> : null}

        <div>{user.login}</div>
      </div>
    </div>
  );
};

export default Todo;
