import axios from 'axios';

const apiRoot = axios.create({
  method: 'get',
  baseURL: process.env.REACT_APP_API_URL,
});

export const getCommentListLength = async () => {
  try {
    const { data } = await apiRoot(`/comments`);

    return data.length;
  } catch (err) {
    throw new Error('not found page');
  }
};

export const getCommentListPerPage = async (page = 1) => {
  try {
    const { data } = await apiRoot(`/comments`, {
      params: {
        _page: page,
        _limit: process.env.REACT_APP_NUM_PER_PAGE,
        _order: 'desc',
        _sort: 'id',
      },
    });

    return data;
  } catch (err) {
    throw new Error('not found page');
  }
};

export const getComment = async (commentId) => {
  try {
    const { data } = await apiRoot(`/comments/${commentId}`);

    return data;
  } catch (err) {
    throw new Error('not found page');
  }
};

export const removeComment = async (commentId) => {
  try {
    await apiRoot(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  } catch (err) {
    throw new Error('not found page');
  }
};

export const editComment = async (commentId, data) => {
  try {
    await apiRoot(`/comments/${commentId}`, {
      method: 'PUT',
      data: data,
    });
  } catch (err) {
    throw new Error('not found page');
  }
};

export const createComment = async (data) => {
  try {
    await apiRoot(`/comments`, {
      method: 'POST',
      data: data,
    });
  } catch (err) {
    throw new Error('not found page');
  }
};
