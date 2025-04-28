import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface locationState {
  location : string
}

// initial state
const initialState: locationState = {
  location : "",
}

// create slice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setlocation : (state , action) => {
      state.location = action.payload;
    },
    
  },
})

// export actions
export const { setlocation } = locationSlice.actions

// export reducer
export default locationSlice.reducer

