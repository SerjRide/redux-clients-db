const initial_state = {
  text: null,
  type: 'success'
}

const alert = (state = initial_state, action) => {
  switch (action.type) {
    case "ALERT_SUCCESS":
      return {
        text: action.text,
        type: 'success'
      };
    default:
      return state;
  }
}

export default alert;
