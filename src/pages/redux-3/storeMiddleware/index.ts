import {
  call,
  put,
  takeEvery,
  takeLatest,
  take,
  select,
} from 'redux-saga/effects';
// import { useDispatch } from 'react-redux';
import AJAX from '../request';
import { useReduxG, slice } from '../react-reduxg';

// take 原始dispatch？

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// worker Saga : 将在 USER_FETCH_REQUESTED action 被 dispatch 时调用
function* progressFetch(action) {
  // const dispatch = useDispatch();

  // console.log(call, put, takeEvery,takeLatest);
  try {
    // debugger
    // TODO 注意不能跟mySaga相同type执行，否则死循环！！！
    // yield put({
    //   type: 'progressChangeStatus',
    //   data: {
    //     progressValueStatus: 'LOADING',
    //   },
    // });
    // 获取 store 的值
    // const { store } = yield select();
    // const progress = store.progress;

    for (let i = true; i; ) {
      const result = yield call(AJAX.getProgressData, {});
      const data = {
        status: result.status,
        progressValue: result.value,
      };

      yield put({
        type: 'store/dispatch',
        // payload 要与定义的reduxg相匹配
        payload: {
          name: 'progress',
          data,
        },
      });

      if (data.status === 'success') {
        break;
      }
      yield sleep(1000);
    }

    // const result = yield call(AJAX.getProgressData, {});
    // const data = {
    //   status: result.status,
    //   progressValue: result.value,
    // };

    // yield put({
    //   type: 'store/dispatch',
    //   // payload 要与定义的reduxg相匹配
    //   payload: {
    //     name: 'progress',
    //     data,
    //   },
    // });

    // yield put(
    //   slice.actions.dispatch({
    //     name: 'progress',
    //     data,
    //   }),
    // );

    // debugger
    // 后面会变成参数传进去
    // const data = yield call(API, {
    //   progressValueStatus: 'SUCCESS',
    //   progressValue: Store.progressValue + 10,
    // });

    // yield put({ type: 'progressChangeStatus', data });

    // const user = yield call(Api.fetchUser, action.payload.userId);
    // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
  } catch (e) {
    yield put({
      type: 'store/dispatch',
      // payload 要与定义的reduxg相匹配
      payload: {
        name: 'progress',
        data: {
          status: 'error',
          // progressValue: result.value,
        },
      },
    });
  }
}

// function* userFetch(action) {
//   // console.log(call, put, takeEvery,takeLatest);
//   try {
//     // debugger
//     // TODO 注意不能跟mySaga相同type执行，比如填userChange、progressChange,会死循环！！！
//     yield put({
//       type: 'progressChangeStatus',
//       data: {
//         progressValueStatus: 'LOADING',
//       },
//     });
//     // 获取 store 的值
//     const { Store } = yield select();
//     // debugger
//     // 后面会变成参数传进去
//     const data = yield call(API, {
//       progressValueStatus: 'SUCCESS',
//       progressValue: Store.progressValue + 10,
//     });

//     yield put({ type: 'progressChangeStatus', data });

//     // const user = yield call(Api.fetchUser, action.payload.userId);
//     // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
//   } catch (e) {
//     yield put({
//       type: 'progressChangeStatus',
//       data: {
//         progressValueStatus: 'ERROR',
//       },
//     });
//   }
// }

/*
  在每个 `USER_FETCH_REQUESTED` action 被 dispatch 时调用 fetchUser
  允许并发（译注：即同时处理多个相同的 action）
*/
function* takeEverySaga() {
  // debugger
  yield takeEvery('progressChange', progressFetch);
  // yield takeEvery('userChange', userFetch);
}

/*
  也可以使用 takeLatest

  不允许并发，dispatch 一个 `USER_FETCH_REQUESTED` action 时，
  如果在这之前已经有一个 `USER_FETCH_REQUESTED` action 在处理中，
  那么处理中的 action 会被取消，只会执行当前的
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default takeEverySaga;
