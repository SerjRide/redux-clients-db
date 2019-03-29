const customers = (state = [], action) => {
  switch (action.type) {
    case "CUSTOMERS_FETCH_DATA_SUCCESS":
      return action.orders;
    default:
      return state;
  }
}

export default customers;
