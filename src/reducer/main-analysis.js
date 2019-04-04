const mainAnalysis = (state = 0, action) => {
  switch (action.type) {
    case "MAIN_ANALYSIS":
      return state += 1;
    default:
      return state;
  }
}

export default mainAnalysis;
