import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployees } from "../api";
// import { getEmployees } from "./api";

export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async (page) => {
    
    return await getEmployees(page,10);
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    list: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      });
  }
});

export default employeeSlice.reducer;
