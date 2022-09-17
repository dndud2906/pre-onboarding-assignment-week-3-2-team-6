import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import rootReducer from './reducers';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
