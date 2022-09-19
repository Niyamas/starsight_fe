import { configureStore } from '@reduxjs/toolkit'
import { apiRoutes } from './apiRoutes'
import hasHeroImageReducer from './global_states/hasHeroImage'

export const store = configureStore({
    /**
   * Compiles all of the reducers together
   * and initializes the initial states in
   * the store, which is called in _app.js.
   * 
   */

     reducer: {
      [apiRoutes.reducerPath]: apiRoutes.reducer,
      hasHeroImage: hasHeroImageReducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        apiRoutes.middleware,
      )
    }
})