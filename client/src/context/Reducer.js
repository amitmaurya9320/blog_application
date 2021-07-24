const Reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL_LOAD":
      return {
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        isFetching: false,
        expireIn: new Date(Date.now() + action.payload.expireIn),
        error: false,
      };
    case "REFRESH_TOKEN":
      return {
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        isFetching: false,
        expireIn: new Date(Date.now() + action.payload.expireIn),
        error: false,
      };
    case "LOGIN_START":
      return {
        accessToken: null,
        user: null,
        isFetching: true,
        expireIn: Number.NEGATIVE_INFINITY,
        error: false,
      };
    case "LOGIN_SUCESS":
      return {
        accessToken: action.payload.accessToken,
        user: action.payload.user,
        expireIn: new Date(Date.now() + action.payload.expireIn),
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        accessToken: null,
        user: null,
        expireIn: Number.NEGATIVE_INFINITY,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        accessToken: null,
        user: null,
        expireIn: Number.NEGATIVE_INFINITY,
        isFetching: false,
        error: false,
      };
    case "UPDATED_USER":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAIL":
      return {
        user: state.user,
        error: true,
      };
    default:
      return state;
  }
};

export default Reducer;
