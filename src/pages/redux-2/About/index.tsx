import { Progress, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useReduxG } from '../react-reduxg';
import './index.less';

function About() {
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
    <div className="About">
      <Progress percent={progressStore.progressValue} />
      <Button onClick={onProgressClick}>加油</Button>
      <Button type="link">
        {/* 不能用a标签，否则会刷新跳转 */}
        <Link to="/">跳转至Index页</Link>
      </Button>
    </div>
  );
}

export default About;
