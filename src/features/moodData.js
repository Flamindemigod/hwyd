import { createSlice } from "@reduxjs/toolkit";

export const moodSlice = createSlice({
    name: "mood",
    initialState: {
        value: {
            DateStorage: {},
        }
    },
    reducers: {
        setMood: (state, action) => {
            //action.state => {date: Date.toDateString(), mood:moodState}
            state.value.DateStorage[action.payload.date.toDateString()] = action.payload.mood
        },
        unsetMood: (state, action) => {
            //action.state => Date.toDateString
            delete state.value.DateStorage[action.payload.toDateString()]
        },
        unsetAllMood: (state, action) => {
            //action.state => None
            state.value.DateStorage = {}
        },
    }
});

export const { setMood, unsetMood, unsetAllMood } = moodSlice.actions;

export default moodSlice.reducer;