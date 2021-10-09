import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface appState {
  info?: any;
}

const initialState: appState = {
  info: undefined,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<appState>) => {
      return (state = action.payload);
    },
  },
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;

export const info = (state: RootState) => state.job.info;
