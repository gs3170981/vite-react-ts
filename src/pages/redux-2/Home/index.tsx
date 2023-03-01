import { Progress, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useReduxG } from '../react-reduxg';

import './index.less';

function Home() {
  const [progressStore, setProgressStore] = useReduxG('progress');

  const onProgressClick = () => {
    if (progressStore.progressValue >= 100) {
      return;
    }
    setProgressStore({
      progressValue: progressStore.progressValue + 10,
    });
  };

  return (
    <div className="Home">
      <Progress percent={progressStore.progressValue} />
      <Button onClick={onProgressClick}>加油</Button>
      <Button type="link">
        {/* 不能用a标签，否则会刷新跳转 */}
        <Link to="/about">跳转至About页</Link>
      </Button>
    </div>
  );
}

export default Home;
