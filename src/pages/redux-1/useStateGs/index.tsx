import { useState, useEffect } from 'react';

export default () => {
  const [_store, set_Store] = useState({
    progressValue: 0,
  });

  // useEffect(() => {}, [props.store]);

  return [_store, set_Store];
};
