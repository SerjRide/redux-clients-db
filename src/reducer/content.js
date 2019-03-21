const content = (state = 'table', action) => {
  if (action.type === 'SHOW_ADD_ORDER') {
    return state = 'addOrder'
  } else return state;
}

export default content;
