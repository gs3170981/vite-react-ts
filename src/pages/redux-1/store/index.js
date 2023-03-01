import { combineReducers } from 'redux'

// 公用状态
const store = {
  user: {},
  progressValue: 0,
}

// 处理进度条的方法集
const reducer = (state = store, action) => {
  const newState = {
    ...state,
    ...action.data,
  }

  JSON.stringify(store) !== JSON.stringify(newState) && console.log(newState);
  return newState
  // if (action.type === 'progressChange') {
  //   return {
  //     ...state,
  //     progressValue: action.progressValue,
  //   };
  // }
  // return state;
}

export function mapStateToProps (storeProps, componentProps) {
  return {
    ...storeProps,
    ...componentProps
  }
};

// 多个组合为一个，这边其实也不用组合
export default combineReducers({
  Store: reducer,
  // more...
})
