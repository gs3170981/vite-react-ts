import { useState, useEffect } from 'react';
import { Provider as _Provider, useSelector, useDispatch } from 'react-redux';
// import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

// import { default as store } from './store/progress';

let _slice;

export function ProviderG(props) {
  _slice = createSlice({
    name: 'store',
    initialState: props.store,
    reducers: {
      dispatch(state, { payload }) {
        // 内置了immutable，也可以state.xx=xx直接改

        state[payload.name] = payload.data;
      },
    },
  });

  const _store = configureStore({
    // reducer: _slice.reducer,
    reducer: {
      store: _slice.reducer,
    },
  });

  return <_Provider store={_store}>{props.children}</_Provider>;
}

export function useReduxG(storeName) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.store[storeName]);
  const setState = (data) => {
    dispatch(
      _slice.actions.dispatch({
        name: storeName,
        data,
      }),
    );
  };

  return [state, setState];
}

// export function useDispatchG(storeName) {
//   return useSelector((state) => state[storeName]);
// }
