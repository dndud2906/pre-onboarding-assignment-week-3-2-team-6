import { commentAPI } from '../../apis';
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from '../../util/asyncUtil';

const GET_COMMENTS_LENGTH = 'comments/GET_COMMENTS_LENGTH';
const GET_COMMENTS_LENGTH_SUCCESS = 'comments/GET_COMMENTS_LENGTH_SUCCESS';
const GET_COMMENTS_LENGTH_ERROR = 'comments/GET_COMMENTS_LENGTH_ERROR';

const GET_COMMENTS = 'comments/GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'comments/GET_COMMENTS_SUCCESS';
const GET_COMMENTS_ERROR = 'comments/GET_COMMENTS_ERROR';

const GET_COMMENT = 'comments/GET_COMMENT';
const GET_COMMENT_SUCCESS = 'comments/GET_COMMENT_SUCCESS';
const GET_COMMENT_ERROR = 'comments/GET_COMMENT_ERROR';

const PUT_COMMENT = 'comments/PUT_COMMENT';
const PUT_COMMENT_SUCCESS = 'comments/PUT_COMMENT_SUCCESS';
const PUT_COMMENT_ERROR = 'comments/PUT_COMMENT_ERROR';

const POST_COMMENT = 'comments/POST_COMMENT';
const POST_COMMENT_SUCCESS = 'comments/POSS_COMMENT_SUCCESS';
const POST_COMMENT_ERROR = 'comments/POST_COMMENT_ERROR';

const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const DELETE_COMMENT_SUCCESS = 'comments/DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_ERROR = 'comments/DELETE_COMMENT_ERROR';

const SET_PAGE = 'comments/SET_PAGE';

export const setPage = (page) => {
  dispatch({ type: SET_PAGE, page });
};
export const getAll = createPromiseThunk(GET_COMMENTS, commentAPI.getAll);
export const getAllLength = createPromiseThunk(
  GET_COMMENTS_LENGTH,
  commentAPI.getLength
);
export const getOne = createPromiseThunk(GET_COMMENT, commentAPI.get);
export const putOne = createPromiseThunk(PUT_COMMENT, commentAPI.put);
export const postOne = createPromiseThunk(POST_COMMENT, commentAPI.post);
export const deleteOne = createPromiseThunk(DELETE_COMMENT, commentAPI.delete);

export const getCommentsList = (page) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENTS });
    const { data: comments } = await commentAPI.getAll(page);
    dispatch({ type: GET_COMMENTS_SUCCESS, comments, page });
  } catch (error) {
    dispatch({ type: GET_COMMENTS_ERROR, error });
  }

  try {
    dispatch({ type: GET_COMMENTS_LENGTH });
    const { data } = await commentAPI.getLength();
    dispatch({ type: GET_COMMENTS_LENGTH_SUCCESS, total: data.length });
  } catch (error) {
    dispatch({ type: GET_COMMENTS_LENGTH_ERROR, error });
  }
};

export const getComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT });
    const { data } = await commentAPI.get(id);
    dispatch({ type: GET_COMMENT_SUCCESS, comment: data });
  } catch (error) {
    dispatch({ type: GET_COMMENT_ERROR, error });
  }
};

export const removeComment = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COMMENT });
    await commentAPI.delete(id);
    dispatch({ type: DELETE_COMMENT_SUCCESS });
    dispatch(getCommentsList(1));
  } catch (error) {
    dispatch({ type: DELETE_COMMENT_ERROR, error });
  }
};

export const createComment = (data) => async (dispatch) => {
  try {
    dispatch({ type: POST_COMMENT });
    await commentAPI.post(data);
    dispatch({ type: POST_COMMENT_SUCCESS });
    dispatch(getCommentsList(1));
  } catch (error) {
    dispatch({ type: POST_COMMENT_ERROR, error });
  }
};

export const editComment = (id, data, page) => async (dispatch) => {
  try {
    dispatch({ type: PUT_COMMENT });
    await commentAPI.put(id, data);
    dispatch({ type: PUT_COMMENT_SUCCESS });
    dispatch(getCommentsList(page));
  } catch (error) {
    dispatch({ type: PUT_COMMENT_ERROR, error });
  }
};

const INITIAL_STATE = {
  comments: reducerUtils.initial(),
  comment: reducerUtils.initial(),
  page: 1,
  total: reducerUtils.initial(),
};

export default function commentsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.page };

    case GET_COMMENTS:
    case GET_COMMENTS_SUCCESS:
    case GET_COMMENTS_ERROR:
      return handleAsyncActions(GET_COMMENTS, 'comments')(state, action);

    case GET_COMMENT:
    case GET_COMMENT_SUCCESS:
    case GET_COMMENT_ERROR:
      return handleAsyncActions(GET_COMMENT, 'comment')(state, action);

    case GET_COMMENTS_LENGTH:
    case GET_COMMENTS_LENGTH_SUCCESS:
    case GET_COMMENTS_LENGTH_ERROR:
      return handleAsyncActions(GET_COMMENTS_LENGTH, 'total')(state, action);

    case PUT_COMMENT:
    case PUT_COMMENT_SUCCESS:
    case PUT_COMMENT_ERROR:
      return handleAsyncActions(PUT_COMMENT, 'comment')(state, action);

    case POST_COMMENT:
    case POST_COMMENT_SUCCESS:
    case POST_COMMENT_ERROR:
      return handleAsyncActions(POST_COMMENT, 'comment')(state, action);

    case DELETE_COMMENT:
    case DELETE_COMMENT_SUCCESS:
    case DELETE_COMMENT_ERROR:
      return handleAsyncActions(DELETE_COMMENT, 'comment')(state, action);

    default:
      return state;
  }
}
