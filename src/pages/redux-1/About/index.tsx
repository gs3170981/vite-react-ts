import { Progress, Button } from 'antd';
// import { connect } from 'react-redux';
// import { mapStateToProps } from '../../store';
import { Link } from 'react-router-dom';
import { actions } from '../react-gredux';
import { useSelector, useDispatch } from 'react-redux';
import './index.less';

function About(props) {
  // const { Store, dispatch } = props;
  const Store = useSelector((state) => state.Store);
  const dispatch = useDispatch();

  const onProgressClick = () => {
    if (Store.progressValue >= 100) {
      return;
    }
    dispatch(actions.dispatch({ progressValue: Store.progressValue + 10 }));
  };

  return (
    <div className="About">
      <Progress percent={Store.progressValue} />
      <Button onClick={onProgressClick}>加油</Button>
      <Button type="link">
        {/* 不能用a标签，否则会刷新跳转 */}
        <Link to="/">跳转至Index页</Link>
      </Button>
    </div>
  );
}

// export default connect(mapStateToProps)(About);
export default About;
