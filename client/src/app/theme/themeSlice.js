import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
// We only need to export the `store` in order to make Redux work with our React app.
// Provider allows Redux to communicate with our components.
export default themeSlice.reducer;