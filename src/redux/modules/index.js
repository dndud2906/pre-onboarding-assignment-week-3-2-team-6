import { combineReducers } from 'redux';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  commentsReducer,
});

export default rootReducer;
