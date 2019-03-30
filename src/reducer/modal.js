const modal = (state = false, action) => {

  if (action.type === 'SHOW_MODAL') {
    return state = true
  } else return state = false

}

export default modal;
