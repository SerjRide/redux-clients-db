import React, { Component } from 'react';

class ContactsInfo extends Component {

  render() {

    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCustomer">
              Заказчик
            </label>
            <input type="text"
              className="form-control"
              id="inputCustomer"
              placeholder="Заказчик"/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputName">
              Контактное лицо
            </label>
            <input type="text"
              className="form-control"
              id="inputName"
              placeholder="Контактное лицо"/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputContacts">
              Почта/телефон
            </label>
            <input type="text"
              className="form-control"
              id="inputContacts"
              placeholder="Почта/телефон"/>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputContacts">
              Товар
            </label>
            <select id="inputState"
              className="form-control">
              <option>Визитки</option>
              <option>Листовки</option>
              <option>Плакаты</option>
            </select>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactsInfo;
