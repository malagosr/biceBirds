import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  birds: 0,
  birdInfo: {},
  isLoading: true,
}

export const birdsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addBirds: (state) => {
        return {...state, birds: action.payload}
    },
    deleteBird: (state) => {
        return {...state, birds: state.birds.filter(bird => bird.uid !== action.payload)}
    },
    callingApi: (state) => {
        return {...state, isLoading: true}
    },
    savedInfo: (state) => {
        return {...state, isLoading: false}
    },
    birdInfo: (state) => {
        return {...state, birdInfo: action.payload}
    }   
  },
})

// Action creators are generated for each case reducer function
export const {addBirds, deleteBird, callingApi, savedInfo, birdInfo} = birdsSlice.actions;

export default birdsSlice.reducer;
