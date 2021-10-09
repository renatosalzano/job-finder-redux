import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface apiState {
  location?: string;
  category?: string;
  page_index: number;
  page_count?: number;
}

const initialState: apiState = {
  location: "",
  category: "",
  page_index: 1,
  page_count: 0,
};

const apiSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    updateReq: (state, action: PayloadAction<Partial<apiState>>) => {
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

export const { updateReq } = apiSlice.actions;
export default apiSlice.reducer;

export const pageCount = (state: RootState) => state.request.page_count;
export const pageIndex = (state: RootState) => state.request.page_index;
export const reqObj = (state: RootState) => state.request;
