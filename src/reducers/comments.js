export const getAllComments = (state) => ({
  type: 'GET_ALL_COMMENTS',
  state,
});
export const getOneComment = (state) => ({ type: 'GET_ONE_COMMENTS', state });

const initalState = {
  comments: [],
  comment: {},
};

const commentsReducer = (state = initalState, action) => {
  if (action.type === 'GET_ALL_COMMENTS')
    return { ...state, comments: state.comments.concat(action.state) };

  if (action.type === 'GET_ONE_COMMENT') return { ...state, comment: action };
  return state;
};

export default commentsReducer;
