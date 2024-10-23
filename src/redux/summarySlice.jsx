import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    summaryData: (state, action) => {
      const { emailList, selectedReports, scheduleDate, skipWeekends, selectedVehicle } = action.payload;

      state.push({
        emailList,
        selectedReports,
        scheduleDate,
        skipWeekends,
        selectedVehicle,
      });
    },
    resetSummaryData: () => {
      return initialState; 
    },
  },
});

export const { summaryData, resetSummaryData } = summarySlice.actions;
export default summarySlice.reducer;
