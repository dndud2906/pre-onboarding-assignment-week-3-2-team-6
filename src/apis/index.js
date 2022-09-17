import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const apiRoot = axios.create({
  method: 'get',
  baseURL: API_URL,
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

export const getComment = async ({ commentId }) => {
  try {
    const { data } = await apiRoot(`/comments${commentId}`);

    return data;
  } catch (err) {
    throw new Error('not found page');
  }
};
