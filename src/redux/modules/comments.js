export const getComments = (state, page) => ({
  type: 'GET_COMMENTS',
  state,
  page,
});
export const getOneComment = (state) => ({ type: 'GET_ONE_COMMENT', state });

export const getTotalLength = (state) => ({ type: 'GET_TOTAL_LENGTH', state });

const INITIAL_STATE = {
  comments: [],
  comment: {},
  page: 0,
  total: 0,
};

const commentsReducer = (state = INITIAL_STATE, action) => {
  if (action.type === 'GET_COMMENTS')
    return { ...state, comments: action.state, page: action.page };

  if (action.type === 'GET_ONE_COMMENT')
    return { ...state, comment: action.state };

  if (action.type === 'GET_TOTAL_LENGTH')
    return { ...state, total: action.state };
  return state;
};

export default commentsReducer;
