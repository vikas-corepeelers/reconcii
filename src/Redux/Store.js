import { configureStore } from '@reduxjs/toolkit'
import ReconciliationSlice from './Slices/Reconciliation'

export const store = configureStore({
  reducer: {
    ReconciliationService: ReconciliationSlice
  },
})