import { createSlice } from '@reduxjs/toolkit';

const initialState ={
     emailList :[],
     selectedReports:{},
     scheduleDate:null,
     skipWeekends:false,
}
const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
      summaryData: (state, action) => {
        const { emailList,selectedReports,scheduleDate,skipWeekends} = action.payload;
         state.emailList=emailList;
         state.selectedReports=selectedReports;
         state.scheduleDate=scheduleDate;
         state.skipWeekends=skipWeekends;
      },
      resetSummaryData: (state) => {
       state.emailList =[];
       state.selectedReports={};
       state.scheduleDate=null;
       state.skipWeekends=false;
      },
    },
  });
  
  export const { summaryData,resetSummaryData } = summarySlice.actions;
  export default summarySlice.reducer;
  