import { useState, useEffect } from 'react';
import { Provider as _Provider, useSelector, useDispatch } from 'react-redux';
import { applyMiddleware } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  call,
  put,
  takeEvery,
  takeLatest,
  take,
  select,
} from 'redux-saga/effects';

// import { default as store } from './store/progress';
const sagaMiddleware = createSagaMiddleware();

let _slice;

// export function put(obj) {
//   return _put({
//     type: 'store/dispatch',

//   });
// }

// export function call(...args) {
//   return _call(...args);
// }

export function ProviderG(props) {
  // const stores = Object.keys(props.store).map()
  const stores = Object.keys(props.store);
  const initialState = {};
  const dispatchAsyncs = [];

  for (let i = 0, dispatchItem; i < stores.length; i++) {
    let value = props.store[stores[i]];

    dispatchItem = value.dispatchAsyncs;

    initialState[stores[i]] = value.store || value;

    if (dispatchItem) {
      for (let j = 0; j < dispatchItem.length; j++) {
        dispatchItem[j].parentType = stores[i];
        dispatchItem[j].type = `${stores[i]}_${dispatchItem[j].type}`;
        dispatchAsyncs.push(dispatchItem[j]);
      }
    }
  }

  // debugger;
  _slice = createSlice({
    name: 'store',
    initialState,
    reducers: {
      dispatch(state, { payload }) {
        // 内置了immutable，也可以state.xx=xx直接改
        // state[payload.name] = payload.data;
        state[payload.name] = {
          ...state[payload.name],
          ...payload.data,
        };
      },
    },
  });

  const _store = configureStore({
    // reducer: _slice.reducer,
    reducer: {
      store: _slice.reducer,
    },
    middleware: [sagaMiddleware],
  });

  // const store = createStore(
  //   rootReducer,
  //   applyMiddleware(sagaMiddleware)
  // )

  const takeEverySaga = function* () {
    // debugger

    for (let i = 0; i < dispatchAsyncs.length; i++) {
      // dispatchAsyncs[i].dispatch.call({
      //   call,
      //   put,
      // });
      yield takeEvery(
        dispatchAsyncs[i].type,
        dispatchAsyncs[i].dispatch.bind({
          call: call,
          put,
          takeEvery,
          takeLatest,
          take,
          select,
          setStore(data) {
            return put({
              type: 'store/dispatch',
              payload: {
                name: dispatchAsyncs[i].parentType,
                data,
              },
            });
          },
          getStore() {
            // store 为 createSlice name
            return select((data) => data.store[dispatchAsyncs[i].parentType]);
          },
        }),
      );
    }
    // yield takeEvery('progressChange', progressFetch);
  };

  // sagaMiddleware.run(props.middleware);
  sagaMiddleware.run(takeEverySaga);

  return <_Provider store={_store}>{props.children}</_Provider>;
}

export const slice = _slice;

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
    // dispatch({
    //   type: 'progressChange',
    // });
  };
  const setStateAsync = (params) => {
    dispatch({
      type: `${storeName}_${params.type}`,
      data: params,
    });
  };

  return [state, setState, setStateAsync];
}

// export function useDispatchG(storeName) {
//   return useSelector((state) => state[storeName]);
// }
