import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  type: "info", // "success", "warning", "error", etc.
  message: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.visible = true;
      state.type = action.payload.type || "info";
      state.message = action.payload.message;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;