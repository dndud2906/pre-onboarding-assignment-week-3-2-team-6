import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const apiRoot = axios.create({
  method: 'get',
  baseURL: API_URL,
});

export const getCommentList = async () => {
  try {
    const { data } = await apiRoot(`/comments`);

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
