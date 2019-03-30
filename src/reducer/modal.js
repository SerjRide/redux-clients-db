const modal = (state = {}, action) => {

  const { type, id } = action
  if (type === 'SHOW_MODAL') {
    return state = { active: true, id }
  } else return state = { active: false, id: null }

}

export default modal;
