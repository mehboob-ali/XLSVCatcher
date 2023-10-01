import { configureStore } from "@reduxjs/toolkit";
import { fileUploadReducer } from "./slices/fileUploadSlice";

const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer, // Make sure the key 'fileUpload' matches your slice name
  },
  // Include Redux DevTools extension as an enhancer
  devTools: process.env.NODE_ENV !== "production", // Enable in development mode
});

export default store;
