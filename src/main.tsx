import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/redux-1/App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import rootReducer from './pages/redux-1/redux-1/store/index';
// import storeData from './pages/redux-1/store/store';
import { GsProvider } from './pages/redux-1/react-gredux';

import './index.css';

// const store = createStore(rootReducer);
// const __dispatch = store.dispatch;

// store.dispatch = (data) => {
//   return __dispatch({
//     type: 'master',
//     data,
//   });
// };

// debugger;
// console.log(store);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    {/* <Provider store={store}>
      <App />
    </Provider> */}
    <GsProvider>
      <App />
    </GsProvider>
    {/* <App /> */}
  </BrowserRouter>,
);

// reportWebVitals();
// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );
