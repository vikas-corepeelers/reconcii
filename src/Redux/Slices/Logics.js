import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  excelFiles:[]
}

export const LogicsSlice = createSlice({
  name: 'LogicsService',
  initialState,
  reducers: {
    setExcelFiles: (state, action) => {
        state.excelFiles = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setExcelFiles } = LogicsSlice.actions

export default LogicsSlice.reducer