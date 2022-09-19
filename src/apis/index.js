import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const commentAPI = {
  getLength: () => api.get(`/`),
  getAll: (page = 1) =>
    api.get(`/`, {
      params: {
        _page: page,
        _limit: process.env.REACT_APP_NUM_PER_PAGE,
        _order: 'desc',
        _sort: 'id',
      },
    }),
  get: (commentId) => api.get(`/${commentId}`),
  delete: (commentId) => api.delete(`/${commentId}`),
  put: ({ commentId, sendData }) => api.put(`/${commentId}`, sendData),
  post: (data) => api.post(`/`, data),
};
