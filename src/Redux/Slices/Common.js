import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userProfile: {},
  userDetailedProfile:{}
}

export const CommonSlice = createSlice({
  name: 'CommonService',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
        state.userProfile = action.payload
    },
    setUserDetailedProfile: (state, action) => {
        state.userDetailedProfile = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserProfile, setUserDetailedProfile } = CommonSlice.actions

export default CommonSlice.reducer