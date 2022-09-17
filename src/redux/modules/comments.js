import * as commentAPI from '../../apis';

const getComments = (state, page) => ({
  type: 'GET_COMMENTS',
  state,
  page,
});
const getOneComment = (state) => ({ type: 'GET_ONE_COMMENT', state });
const getTotalLength = (state) => ({ type: 'GET_TOTAL_LENGTH', state });

export const getCommentsList = (page) => async (dispatch) => {
  try {
    const comments = await commentAPI.getCommentListPerPage(page);
    dispatch(getComments(comments, page));
  } catch (e) {
    throw new Error();
  }
};

export const getComment = (id) => async (dispatch) => {
  try {
    const comment = await commentAPI.getComment(id);
    dispatch(getOneComment(comment));
  } catch (e) {
    throw new Error();
  }
};

export const removeComment = (id) => async (dispatch) => {
  try {
    await commentAPI.removeComment(id);
    dispatch(getCommentsList(1));
  } catch (e) {
    throw new Error();
  }
};

export const createComment = (data) => async (dispatch) => {
  try {
    await commentAPI.createComment(data);
    dispatch(getCommentsList(1));
  } catch (e) {
    throw new Error();
  }
};

export const editComment = (id, data, page) => async (dispatch) => {
  try {
    await commentAPI.editComment(id, data);
    dispatch(getCommentsList(page));
    dispatch(getOneComment({}));
  } catch (e) {
    throw new Error();
  }
};

export const getCommentListLength = () => async (dispatch) => {
  try {
    const commentsLength = await commentAPI.getCommentListLength();
    dispatch(getTotalLength(commentsLength));
  } catch (e) {
    throw new Error();
  }
};

const INITIAL_STATE = {
  comments: [],
  comment: {},
  page: 0,
  total: 0,
};

export default function commentsReducer(state = INITIAL_STATE, action) {
  if (action.type === 'GET_COMMENTS')
    return { ...state, comments: action.state, page: action.page };

  if (action.type === 'GET_ONE_COMMENT')
    return { ...state, comment: action.state };

  if (action.type === 'GET_TOTAL_LENGTH')
    return { ...state, total: action.state };
  return state;
}
