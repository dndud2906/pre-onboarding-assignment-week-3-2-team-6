export const getAllComments = (action) => ({
  type: 'GET_ALL_COMMENTS',
  action,
});
export const getOneComment = (action) => ({ type: 'GET_ONE_COMMENTS', action });

const initalState = {
  comments: [],
  comment: {},
};

const commentsReducer = (state = initalState, action) => {
  if (action.type === 'GET_ALL_COMMENTS')
    return { ...state, comments: [...state.comments, action] };
  if (action.type === 'GET_ONE_COMMENT') return { ...state, comment: action };
  return state;
};

export default commentsReducer;
