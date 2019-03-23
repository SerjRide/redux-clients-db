const showNavbar = () => ({ type: 'SHOW_NAVBAR' })
const hideNavbar = () => ({ type: 'HIDE_NAVBAR' })
const reqDone = (orders) => ({ type: "ITEMS_FETCH_DATA_SUCCESS", orders })

const getData = (request) => {
  return (dispatch) => {
    fetch('/' + request)
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqDone(orders)))
  };
};

const setData = (request, body) => {
  return (dispatch) => {
    fetch('/' + request, {
      method: 'POST',
      body: JSON.stringify(body),
      headers:{'content-type': 'application/json'}
    })
    .then((res) => {
      if(!res.ok) throw new Error(res.statusText)
      return res;
    })
    .then((res) => res.json())
    .then((orders) => dispatch(reqDone(orders)))
  };
};

export { showNavbar, hideNavbar, getData, setData }
