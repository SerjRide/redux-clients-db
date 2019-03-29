const orders = (state = [], action) => {
  switch (action.type) {
    case "ORDERS_FETCH_DATA_SUCCESS":
      return action.orders;
    default:
      return state;
  }
}

export default orders;
