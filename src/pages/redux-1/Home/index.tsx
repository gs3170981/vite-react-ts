import { Progress, Button } from 'antd';
// import { connect } from 'react-redux';
// import { mapStateToProps } from '../../store';
import { Link } from 'react-router-dom';
// import useStateGs from '../useStateGs';
import { actions } from '../react-gredux';
import { useSelector, useDispatch } from 'react-redux';

import './index.less';

function Home(props) {
  // 取对应的 namespance
  const Store = useSelector((state) => state.Store);
  const dispatch = useDispatch();

  // const Store = slice.getInitialState().Store;

  // const { Store, dispatch } = props;
  // const [Store, dispatch] = useStateGs();

  const onProgressClick = () => {
    console.log(actions);
    if (Store.progressValue >= 100) {
      return;
    }
    dispatch(actions.dispatch({ progressValue: Store.progressValue + 10 }));
    // slice.actions.dispatch({
    //   progressValue: Store.progressValue + 10,
    // });
  };

  return (
    <div className="Home">
      <Progress percent={Store.progressValue} />
      <Button onClick={onProgressClick}>加油</Button>
      <Button type="link">
        {/* 不能用a标签，否则会刷新跳转 */}
        <Link to="/about">跳转至About页</Link>
      </Button>
    </div>
  );
}

// export default connect(mapStateToProps)(Home);
export default Home;
