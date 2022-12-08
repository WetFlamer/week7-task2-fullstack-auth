import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  signingUp: false,
  signingIn: false,
  token: localStorage.getItem("token"),
  id: localStorage.getItem('id')
};

export const authSignUp = createAsyncThunk(
  "auth/signup",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/auth", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const users = await res.json();

      if (users.error) {
        return thunkAPI.rejectWithValue(users.error);
      }

      return thunkAPI.fulfillWithValue(users);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSignIn = createAsyncThunk(
  "auth/signIn",
  async ({ login, password }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const {token, id} = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("token", token);
      localStorage.setItem('id', id)
      return thunkAPI.fulfillWithValue(token);
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder
      .addCase(authSignUp.pending, (state) => {
        state.signingUp = true;
        state.error = null;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.signingUp = false;
        state.error = null;
      })
      // POST ЗАПРОС ТОКЕН
      .addCase(authSignIn.pending, (state) => {
        state.signingIn = true;
        state.error = null;
      })
      .addCase(authSignIn.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        state.signingIn = false;
        state.error = null;
        state.token = action.payload;
      });
  },
});

export default applicationSlice.reducer;
