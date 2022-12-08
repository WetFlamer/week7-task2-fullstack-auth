import { configureStore } from "@reduxjs/toolkit";
import application  from "../features/applicationSlice";
import users from '../features/usersSlice'
import todos from '../features/todosSlice'
export const store = configureStore({
  reducer: {
    application,
    users,
    todos
  },
});
