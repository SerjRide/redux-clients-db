const navbarPanel = (state = false, action) => {
  if (action.type === 'SHOW_NAVBAR') {
    return state = true
  } else return state = false
}

export default navbarPanel;
