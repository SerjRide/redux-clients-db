const checkToken = (token) => {
  const headers = new Headers();
  headers.append("content-type", "application/json");
  headers.append("Authorization", token);
  return headers;
};

const showNavbar = () => ({ type: 'SHOW_NAVBAR' });
const hideNavbar = () => ({ type: 'HIDE_NAVBAR' });
const showModal = (id) => ({ type: 'SHOW_MODAL', id });
const hideModal = () => ({ type: 'HIDE_MODAL' });
const reqOrdersDone = (orders) => ({ type: "ORDERS_FETCH_DATA_SUCCESS", orders });
const reqCustomersDone = (customers) => ({ type: "CUSTOMERS_FETCH_DATA_SUCCESS", customers });
const alertSaccess = (text) => ({ type: 'ALERT_SUCCESS', text: text });
const authorization = (token, rights) => ({ type: 'AUTHORIZE', token, rights });
const sign_out = () => ({ type: 'SIGN_OUT' });
const mainAnalysis = () => ({ type: 'MAIN_ANALYSIS' });
const changeFilter = (year, mounth, day, info) => ({ type: "FILTER_CHANGE",
                                                  year, mounth, day, info })

const getData = (year, token) => {

  return (dispatch) => {
    fetch('/orders/' + year, {
      method: 'GET',
      headers: checkToken(token)
    })
    .then((res) => {
      if (!res.ok) {
        if (res.statusText !== 'Unauthorized') throw new Error(res.statusText)
      }
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqOrdersDone(orders)))
  };
};

// const controller = async (year, dispatch) => {
//   const res = await fetch('/customers');
//   const body = await res.json();
//   await dispatch(reqCustomersDone(body))
//   return body
// }
//
// const getCustomers = (year) => {
//   return (dispatch) => {
//     controller(year, dispatch)
//   };
// }

const setData = (body, token) => {
  return (dispatch) => {
    fetch('/order', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: checkToken(token)
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqOrdersDone(orders)))
  };
};

const delData = (id, token) => {
  return (dispatch) => {
    fetch('/order/' + id, {
      method: 'DELETE',
      headers: checkToken(token)
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqOrdersDone(orders)))
  };
};

const controller = async (dispatch, year, token) => {
  const res = await fetch('/customers', {
    method: 'GET',
    headers: checkToken(token)
  });
  const body = await res.json();
  await dispatch(reqCustomersDone(body))
  return body
}

const getCustomers = (year, token) => {
  return (dispatch) => {
    controller(dispatch, year, token)
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

const editOrder = (id, body, token) => {
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

const autorize = async (dispatch, log, pass) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      login: log,
      password: pass
    }),
    headers:{'content-type': 'application/json'}
  }
  const res = await fetch('/signin', options);
  const body = await res.json();
  await dispatch(authorization(body.token, body.rights));
  if (body.token !== null) {
    localStorage.setItem('token', body.token);
    localStorage.setItem('login', log);
  }
  return body.token
}

const getAutorize = (log, pass) => {
  return (dispatch) => {
    autorize(dispatch, log, pass)
  };
}

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
  getCustomers,
  sign_out,
  getAutorize,
  mainAnalysis
}
