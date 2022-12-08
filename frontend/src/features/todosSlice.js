import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });
      const todos = await res.json();
      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error.message);
      }
      return thunkAPI.fulfillWithValue(todos);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/add/fetch",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}
        `,
        },
        body: JSON.stringify({ text: data.text }),
      });
      const todos = await res.json();

      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }

      return thunkAPI.fulfillWithValue(todos);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete/fetch",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });
      const todos = await res.json();
      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }

      return thunkAPI.fulfillWithValue(todos);
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const completeTodo = createAsyncThunk(
  "todos/completed/fetch",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !data.completed }),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });
      const todos = await res.json();
      if (todos.error) {
        return thunkAPI.rejectWithValue(todos.error);
      }
      return thunkAPI.fulfillWithValue(todos);
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);
const todosSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //GET ЗАПРОС
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
          state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.userId = action.payload;
      })
      // POST ЗАПРОС
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      // PATCH ЗАПРОС
      .addCase(completeTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(completeTodo.pending, (state, action) => {
        state.error = null;
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.meta.arg.id) {
            todo.loading = true;
          }
          return todo;
        });
      })
      .addCase(completeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.completed = !todo.completed;
            todo.loading = false;
          }
          return todo;
        });
      })
      //

      // DELETE ЗАПРОС
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.deleted = false;
        state.loading = false;
      })
      .addCase(deleteTodo.pending, (state, action) => {
        state.error = null;
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.meta.arg.id) {
            todo.deleted = true;
          }
          return todo;
        });
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos = state.todos.filter((todo) => {
          if (todo._id === action.payload._id) {
            return false;
          }
          if (todo.deleted) {
            return false;
          }
          return todo;
        });
      });
  },
});

export default todosSlice.reducer;
