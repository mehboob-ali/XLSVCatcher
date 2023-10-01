import { createSlice } from "@reduxjs/toolkit";

const initialState={
    file: null,

}

const fileUploadSlice = createSlice({
    name: 'uploadedFile',
    initialState,
    reducers:{
        storeUploadedFile: (state, action) =>{ state.file=action.payload}
    }

})

export const { storeUploadedFile } = fileUploadSlice.actions;
export const fileUploadReducer = fileUploadSlice.reducer;
