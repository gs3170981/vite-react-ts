import { Progress, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useReduxG, useReduxMiddleWareG } from '../react-reduxg';
import { useReduxG } from '../react-reduxg';

import './index.less';

function Home() {
  const [progressStore, setProgressStore, setProgressStoreAsync] =
    useReduxG('progress');

  console.log('Home', progressStore);

  const onProgressClick = () => {
    if (progressStore.progressValue >= 100) {
      return;
    }
    // console.log(dispatch);
    setProgressStoreAsync({
      type: 'TYPE1',
      data: {
        something: '...',
      },
    });
    // setProgressStore({
    //   progressValue: progressStore.progressValue + 10,
    // });
  };

  const getProgressStoreStatus = () => {
    if (progressStore.progressValue >= 100) {
      return 'success';
    }
    if (progressStore.status === 'error') {
      return 'exception';
    }
    return 'normal';
  };

  return (
    <div className="Home">
      <Progress
        status={getProgressStoreStatus()}
        percent={progressStore.progressValue}
      />
      <Button onClick={onProgressClick}>
        {progressStore.status === 'error' ? '重试' : '加油'}
      </Button>
      <Button type="link">
        {/* 不能用a标签，否则会刷新跳转 */}
        <Link to="/about">跳转至About页</Link>
      </Button>
    </div>
  );
}

export default Home;
