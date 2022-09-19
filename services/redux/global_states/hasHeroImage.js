import { createSlice } from '@reduxjs/toolkit'

const hasHeroImage = createSlice({
  name: 'hasHeroImage',
  initialState: {value: false},
  reducers: {
    setHeroImageTrue(state) {
      state.value = true
    },
    setHeroImageFalse(state) {
      state.value = false
    },
  }
})

export const { setHeroImageTrue, setHeroImageFalse } = hasHeroImage.actions
export default hasHeroImage.reducer