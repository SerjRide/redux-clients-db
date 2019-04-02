const token = (state = {}, action) => {
  switch (action.type) {
    case "AUTHORIZE":
      return state = {
        token: action.token,
        rights: action.rights
      };
    case "SIGN_OUT":
      return state = {};
    default:
      return state;
  }
}

export default token;
