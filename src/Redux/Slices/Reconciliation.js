import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  types: [],
}

export const ReconciliationSlice = createSlice({
  name: 'ReconciliationService',
  initialState,
  reducers: {
    setTypesData: (state, action) => {
        state.types = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTypesData } = ReconciliationSlice.actions

export default ReconciliationSlice.reducer