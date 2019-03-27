const showNavbar = () => ({ type: 'SHOW_NAVBAR' })
const hideNavbar = () => ({ type: 'HIDE_NAVBAR' })
const reqDone = (orders) => ({ type: "ITEMS_FETCH_DATA_SUCCESS", orders })

const getData = (request) => {
  return (dispatch) => {
    fetch('/getbyyear/' + request)
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

const delData = (id) => {
  return (dispatch) => {
    fetch('/delorder/' + id, {
      method: 'DELETE',
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

const changeFilter = (year, mounth, day) => ({ type: "FILTER_CHANGE", year, mounth, day })

const alertSaccess = (text) => ({ type: 'ALERT_SUCCESS', text: text })

export {
  showNavbar,
  hideNavbar,
  getData,
  setData,
  alertSaccess,
  delData,
  changeFilter
}
