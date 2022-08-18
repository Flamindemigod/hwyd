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
        setActiveDate: (state, action) => {
            state.value.activeDate = action.payload.toDateString();
        },
        setMood: (state, action) => {
            //action.state => {date: Date.toDateString(), mood:moodState}
            if (state.value.DateStorage[action.payload.date.getFullYear()]) {
                if (state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()]) {
                    if (state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()][action.payload.date.getDate()]) {
                        state.value.DateStorage = {
                            ...state.value.DateStorage,
                            [action.payload.date.getFullYear()]: {
                                ...state.value.DateStorage[action.payload.date.getFullYear()],
                                [action.payload.date.getMonth()]: {
                                    ...state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()],
                                    [action.payload.date.getDate()]: {
                                        ...state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()][action.payload.date.getDate()],
                                        mood: action.payload.mood
                                    }
                                }
                            }
                        }
                    }
                    else {
                        state.value.DateStorage = {
                            ...state.value.DateStorage,
                            [action.payload.date.getFullYear()]: {
                                ...state.value.DateStorage[action.payload.date.getFullYear()],
                                [action.payload.date.getMonth()]: {
                                    ...state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()],
                                    [action.payload.date.getDate()]: {
                                        mood: action.payload.mood
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    state.value.DateStorage = {
                        ...state.value.DateStorage,
                        [action.payload.date.getFullYear()]: {
                            ...state.value.DateStorage[action.payload.date.getFullYear()],
                            [action.payload.date.getMonth()]: {
                                [action.payload.date.getDate()]: {
                                    mood: action.payload.mood
                                }
                            }
                        }
                    }
                }
            }
            else {
                state.value.DateStorage = {
                    ...state.value.DateStorage,
                    [action.payload.date.getFullYear()]: {
                        [action.payload.date.getMonth()]: {
                            [action.payload.date.getDate()]: {
                                mood: action.payload.mood
                            }
                        }
                    }
                }
            }
        },
        setNote: (state, action) => {
            //action.state => {date: Date.toDateString(), mood:moodState}
            if (state.value.DateStorage[action.payload.date.getFullYear()]) {
                if (state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()]) {
                    if (state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()][action.payload.date.getDate()]) {
                        state.value.DateStorage = {
                            ...state.value.DateStorage,
                            [action.payload.date.getFullYear()]: {
                                ...state.value.DateStorage[action.payload.date.getFullYear()],
                                [action.payload.date.getMonth()]: {
                                    ...state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()],
                                    [action.payload.date.getDate()]: {
                                        ...state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()][action.payload.date.getDate()],
                                        note: action.payload.note
                                    }
                                }
                            }
                        }
                    }
                    else {
                        state.value.DateStorage = {
                            ...state.value.DateStorage,
                            [action.payload.date.getFullYear()]: {
                                ...state.value.DateStorage[action.payload.date.getFullYear()],
                                [action.payload.date.getMonth()]: {
                                    ...state.value.DateStorage[action.payload.date.getFullYear()][action.payload.date.getMonth()],
                                    [action.payload.date.getDate()]: {
                                        note: action.payload.note
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    state.value.DateStorage = {
                        ...state.value.DateStorage,
                        [action.payload.date.getFullYear()]: {
                            ...state.value.DateStorage[action.payload.date.getFullYear()],
                            [action.payload.date.getMonth()]: {
                                [action.payload.date.getDate()]: {
                                    note: action.payload.note
                                }
                            }
                        }
                    }
                }
            }
            else {
                state.value.DateStorage = {
                    ...state.value.DateStorage,
                    [action.payload.date.getFullYear()]: {
                        [action.payload.date.getMonth()]: {
                            [action.payload.date.getDate()]: {
                                note: action.payload.note
                            }
                        }
                    }
                }
            }

        },
        unsetMood: (state, action) => {
            //action.payload => Date.toDateString
            try{
                delete state.value.DateStorage[action.payload.getFullYear()][action.payload.getMonth()][action.payload.getDate()].mood
            }
            catch{
                console.log("failed to unset")
            }
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

export const { setActiveDate, setMood, unsetMood, setNote, unsetAll, getSupabaseData } = moodSlice.actions;

export default moodSlice.reducer;