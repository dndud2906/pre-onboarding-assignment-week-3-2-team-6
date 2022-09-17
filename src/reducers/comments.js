export const getComments = (state, page) => ({
  type: 'GET_COMMENTS',
  state,
  page,
});
export const getOneComment = (state) => ({ type: 'GET_ONE_COMMENT', state });

const initalState = {
  comments: [],
  comment: {},
  page: 0,
};

const commentsReducer = (state = initalState, action) => {
  if (action.type === 'GET_COMMENTS')
    return { ...state, comments: action.state, page: action.page };

  if (action.type === 'GET_ONE_COMMENT')
    return { ...state, comment: action.state };
  return state;
};

export default commentsReducer;
