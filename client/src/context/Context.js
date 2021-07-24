import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
const INITIAL_STATE = {
  accessToken: null,
  user: null,
  expireIn: Number.NEGATIVE_INFINITY,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const refreshToken = async () => {
    console.log("refresh");
    try {
      const res = await axios.post("/auth/refreshToken");
      dispatch({ type: "INITIAL_LOAD", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  axios.interceptors.request.use(async (req) => {
    if (state.user && new Date() > state.expireIn) {
      if (req.url !== "/auth/refreshToken") {
        try {
          const res = await axios.post("/auth/refreshToken");
          dispatch({ type: "INITIAL_LOAD", payload: res.data });
          req.headers.authorization = res.data.accessToken;
        } catch (err) {}
      }
    } else if (state.user) {
      req.headers.authorization = state.accessToken;
    }
    return req;
  });

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <Context.Provider
      value={{
        accessToken: state.accessToken,
        expireIn: state.expireIn,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        refreshToken: refreshToken,
      }}
    >
      {children}
    </Context.Provider>
  );
};
