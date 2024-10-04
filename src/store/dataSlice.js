import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    chatData: null
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        modifyChat: (state, action) => {
            state.chatData = action.payload
        },
        removeChat: (state) => {
            state.chatData = null;
        }
    }
});


export const {modifyChat, removeChat} = chatSlice.actions;

export default  chatSlice.reducer;