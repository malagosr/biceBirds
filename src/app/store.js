import {configureStore} from '@reduxjs/toolkit';
import birdsSlice from '../features/birds/birdsSlice';

export const store = configureStore({
  reducer: {
    birds: birdsSlice,
  },
});
