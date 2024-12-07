
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFeaturesApi, getTrendApi } from "../../api/api";

export const getFeatures = createAsyncThunk("dashboard/features", async (filter, thunkAPI) => {
    try {
        return await getFeaturesApi(filter.start_date, filter.end_date, filter.age, filter.gender);
    } catch (error) {
        return thunkAPI.rejectWithValue({ getFeatures: error.response.data});
    }
});

export const getTrend = createAsyncThunk("dashboard/trend", async (filter, thunkAPI) => {
    try {
        return await getTrendApi(filter.start_date, filter.end_date, filter.age, filter.gender, filter.category);
    } catch (error) {
        return thunkAPI.rejectWithValue({ getTrend: error.response.data});
    }
});

const initialState = {
    features: null,
    trend: null,
    error: null,
    loadingBar: true,
    selected: null,
    loadingLine: true,
    filter: {
        age: 'any',
        gender: 'any',
        start_date: '2022-10-04',
        end_date: '2022-10-29',
    }
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
        setSelected(state, action){
            state.selected = action.payload;
        },
        setFilter(state, action){
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFeatures.fulfilled, (state, action) => {
            state.features = action.payload;
            state.error = null;
            state.loadingBar = false;
        }).addCase(getFeatures.rejected, (state, action) => {
            state.features = null;
            state.error = action.payload;
            state.loadingBar = false;
        }).addCase(getTrend.fulfilled, (state, action) => {
            state.trend = action.payload;
            state.error = null;
            state.loadingLine = false;
        }).addCase(getTrend.rejected, (state, action) => {
            state.trend = null;
            state.error = action.payload;
            state.loadingLine = false;
        })
    }
});

export const dashboardReducer = dashboardSlice.reducer;

export const dashboardActions = dashboardSlice.actions;

export const dashboardSelector = (state) => state.dashboardReducer;
