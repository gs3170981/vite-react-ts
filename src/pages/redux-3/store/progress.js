import AJAX from '../request';

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// 创建redux时，name会帮你添加一个父级对象
const store = {
  status: 'init',
  progressValue: 0,
};

const dispatchAsyncs = [
  {
    type: 'TYPE1',
    dispatch: function* ({ data } = {}) {
      console.log('progress-TYPE1', data);

      try {
        for (let i = true; i; ) {
          const _store = yield this.getStore();

          const result = yield this.call(AJAX.getProgressData, {});
          const progressValue = _store.progressValue + result.value;
          const data = {
            status: result.status,
            progressValue: progressValue > 100 ? 100 : progressValue,
          };

          yield this.setStore(data);

          if (data.progressValue >= 100) {
            break;
          }
          yield sleep(100);
        }
      } catch (e) {
        yield this.setStore({
          status: 'error',
        });
      }
    },
  },
];

export default {
  store,
  dispatchAsyncs,
};
