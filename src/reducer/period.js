const initial_state = {
  year: '18',
  mounth: ''
}

const period = (state = initial_state, action) => {
  switch (action.type) {
    case "PERIOD_CHANGE":
      return {
        year: action.year,
        mounth: action.mounth
      };
    default:
      return state;
  }
}

export default period;
