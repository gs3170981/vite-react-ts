import { useState, useEffect } from 'react';
import { Provider as _Provider } from 'react-redux';
// import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

import { default as store } from './store/store';

const _slice = createSlice({
  name: 'Store',
  initialState: store,
  reducers: {
    dispatch(state, { payload }) {
      // 内置了immutable，也可以state.xx=xx直接改
      return {
        ...state,
        ...payload,
      };
      // return {

      // }
    },
  },
});

const _store = configureStore({
  // reducer: _slice.reducer,
  reducer: {
    Store: _slice.reducer,
  },
});

// const __dispatch = _store.dispatch;

// _store.dispatch = (data) => {
//   return __dispatch({
//     type: 'Store',
//     data,
//   });
// };

// export const slice = _slice;
export const actions = _slice.actions;

export function GsProvider(props) {
  // const store = createStore(props.store)
  // const [_store, set_Store] = useState(props.store);

  // const slice = createSlice({
  //   name: 'Store',
  //   initialState: props.store,
  //   reducers: {
  //     dispatch(state, action) {
  //       debugger;
  //       // return {

  //       // }
  //     },
  //   },
  // });

  // const store = configureStore({
  //   reducer: slice.reducer,
  // });

  // const __dispatch = store.dispatch;

  // store.dispatch = (data) => {
  //   return __dispatch({
  //     type: 'Store',
  //     data,
  //   });
  // };

  // console.log(11, store);

  // return {
  //   Provider: <_Provider store={store}>{props.children}</_Provider>,
  //   reducer: store,
  // };

  return <_Provider store={_store}>{props.children}</_Provider>;
  // return slice;
  // return configureStore({
  //   reducer: slice.reducer
  // })
}

export function useGsStore() {}

// export const { dispatch } = GsProvider.actions;

// export default Provider.reducer

// export const store = configureStore({
//   reducer: Provider.reducer
// })
