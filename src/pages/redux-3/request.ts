export default {
  getProgressData: () => {
    return new Promise((success, fail) => {
      setTimeout(() => {
        const r = (Math.random() * 15) | 0;

        if (r === 0) {
          fail();
          return;
        }
        if (r >= 1 && r < 7) {
          success({
            status: 'success',
            value: 1,
          });
          return;
        }
        if (r >= 7 && r < 13) {
          success({
            status: 'success',
            value: 3,
          });
          return;
        }
        if (r >= 13) {
          success({
            status: 'success',
            value: 5,
          });
          return;
        }
      }, 0);
    });
  },
};
