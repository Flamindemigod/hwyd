import { createSlice } from "@reduxjs/toolkit";

export const moodSlice = createSlice({
    name: "mood",
    initialState: {
        value: {
            DateStorage: {},
            activeDate: new Date()
        }
    },
    reducers: {
        setActiveDate: (state, action) =>{
            state.value.activeDate = action.payload.toDateString();
        },
        setMood: (state, action) => {
            //action.state => {date: Date.toDateString(), mood:moodState}
            state.value.DateStorage[action.payload.date.toDateString()] = {...state.value.DateStorage[action.payload.date.toDateString()], mood: action.payload.mood}
        },
        setNote: (state, action) => {
            //action.state => {date: Date.toDateString(), mood:moodState}
            state.value.DateStorage[action.payload.date.toDateString()] = {...state.value.DateStorage[action.payload.date.toDateString()], note: action.payload.note}
        
        },
        unsetMood: (state, action) => {
            //action.payload => Date.toDateString
            delete state.value.DateStorage[action.payload.toDateString()]
        },
        unsetAll: (state, action) => {
            //action.payload => None
            state.value.DateStorage = {}
        },
        getSupabaseData: (state, action) => {
            //action.payload => {}
            state.value.DateStorage = action.payload

        },

    }
});

export const { setActiveDate ,setMood, unsetMood,setNote, unsetAll, getSupabaseData } = moodSlice.actions;

export default moodSlice.reducer;