const showNavbar = () => ({ type: 'SHOW_NAVBAR' })
const hideNavbar = () => ({ type: 'HIDE_NAVBAR' })
const showModal = (id) => ({ type: 'SHOW_MODAL', id })
const hideModal = () => ({ type: 'HIDE_MODAL' })
const reqOrdersDone = (orders) => ({ type: "ORDERS_FETCH_DATA_SUCCESS", orders })
const reqCustomersDone = (customers) => ({ type: "CUSTOMERS_FETCH_DATA_SUCCESS", customers })
const alertSaccess = (text) => ({ type: 'ALERT_SUCCESS', text: text })
const changeFilter = (year, mounth, day, info) => ({ type: "FILTER_CHANGE",
                                                  year, mounth, day, info })

const getData = (request) => {
  return (dispatch) => {
    fetch('/orders/' + request)
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqOrdersDone(orders)))
  };
};

const setData = (body) => {
  return (dispatch) => {
    fetch('/order', {
      method: 'POST',
      body: JSON.stringify(body),
      headers:{'content-type': 'application/json'}
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqOrdersDone(orders)))
  };
};

const delData = (id) => {
  return (dispatch) => {
    fetch('/order/' + id, {
      method: 'DELETE',
      headers:{'content-type': 'application/json'}
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqOrdersDone(orders)))
  };
};

const controller = async (year, dispatch) => {
  const res = await fetch('/customers');
  const body = await res.json();
  await dispatch(reqCustomersDone(body))
  return body
}

const getCustomers = (year) => {
  return (dispatch) => {
    controller(year, dispatch)
  };
}

// const extractCustomersByYeat = (year) => {
//   return (dispatch) => {
//     fetch('/getcustomersbyyear/' + year)
//     .then((res) => {
//       if(!res.ok) throw new Error(res.statusText)
//       return res;
//     })
//     .then((res) => res.json())
//     .then((customers) => {
//       console.log(customers);
//       dispatch(reqCustomersDone(customers))
//     })
//   };
// }

const editOrder = (id, body) => {
  return (dispatch) => {
    fetch('/order/' + id, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers:{'content-type': 'application/json'}
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqOrdersDone(orders)))
  };
};

export {
  showNavbar,
  hideNavbar,
  getData,
  setData,
  alertSaccess,
  delData,
  changeFilter,
  showModal,
  hideModal,
  editOrder,
  getCustomers
}
