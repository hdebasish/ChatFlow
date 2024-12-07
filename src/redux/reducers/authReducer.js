import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInUser, signUpUser, logoutUser, getUserInfo } from "../../api/api";

export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
    try {
        return await getUserInfo();
    } catch (error) {
        return thunkAPI.rejectWithValue({ getUser: error.response.data});
    }
});

export const signUp = createAsyncThunk("auth/signin", async (newUser, thunkAPI) => {
    try {
        return await signUpUser(newUser.name, newUser.email, newUser.password);
    } catch (error) {
        return thunkAPI.rejectWithValue({ signup: error.response.data});
    }
});

export const signIn = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await signInUser(user.email, user.password);
    } catch (error) {
        return thunkAPI.rejectWithValue({ signin: error.response.data});
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        return logoutUser();
    } catch (error) {
        return thunkAPI.rejectWithValue({ logout: error.response.data});
    }
});

const initialState = {
    user: null,
    loading: true,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        }).addCase(signUp.fulfilled, (state, action) => {
            state.user = action.payload;
            state.error = action.payload;
            state.loading = false;
        }).addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        }).addCase(logout.fulfilled, (state, action) => {
            state.user = null;
        }).addCase(signUp.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(signIn.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(logout.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }).addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    }
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export const authSelector = (state) => state.authReducer;
