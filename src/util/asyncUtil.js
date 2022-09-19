export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (param) => async (dispatch) => {
    dispatch({ type, param });
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload });
    } catch (error) {
      dispatch({ type: ERROR, error });
    }
  };
};

export const reducerUtils = {
  initial: (initialData = null) => ({
    loading: false,
    error: null,
    data: initialData,
  }),
  loading: () => ({
    loading: true,
  }),
  success: (payload) => ({
    loading: false,
    error: null,
    data: payload,
  }),
  error: (error) => ({
    loading: false,
    error: error,
  }),
};

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload.data),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};
