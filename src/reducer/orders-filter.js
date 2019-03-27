const initial_state = {
  year: '18',
  mounth: '',
  day: ''
}

const ordersFilter = (state = initial_state, action) => {
  switch (action.type) {
    case "FILTER_CHANGE":
      return {
        year: action.year,
        mounth: action.mounth,
        day: action.day
      };
    default:
      return state;
  }
}

export default ordersFilter;
