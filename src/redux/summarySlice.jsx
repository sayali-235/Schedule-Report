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
     
  },
});

export const { summaryData  } = summarySlice.actions;
export default summarySlice.reducer;
