export const LoginStart = (userCredentail) => {
  return { type: "LOGIN_START" };
};

export const LoginSuccess = (user) => {
  return {
    type: "LOGIN_SUCESS",
    payload: user,
  };
};

export const LoginFailure = () => {
  return { type: "LOGIN_FAILURE" };
};

export const Logout = () => {
  return { type: "LOGOUT" };
};
