import rootReducer from './modules';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);
