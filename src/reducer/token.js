// const initial_state = 'eyJhbGciOiJIUzI1NiJ9.NWNhMjc3YjM3Zjg5NWFmZWE3NzVjMjEz.QlEWqOo_4QVak0YAiW8ZaimV3dYbDU6cX4_b_Y-r7OA';
const initial_state = null;

const token = (state = initial_state, action) => {
  switch (action.type) {
    case "AUTHORIZE":
      return state = action.token;
    case "SIGN_OUT":
      return state = null;
    default:
      return state;
  }
}

export default token;
