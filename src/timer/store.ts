import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 5 * 60 },
  reducers: {
    tick(state) {
      state.value -= 1;
    },
    reset(state, action) {
      state.value = action.payload;
    },
  },
});
const { tick, reset } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export type { RootState, AppDispatch };

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { store, tick, reset, useAppDispatch, useAppSelector };
