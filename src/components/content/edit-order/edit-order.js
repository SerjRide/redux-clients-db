import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderById } from '../../../service'

import { alertSaccess, getData, hideModal, editOrder } from '../../../actions';

class EditOrder extends Component {

  state = {
    editMode: false
  }

  componentDidUpdate(){
    if (this.state.editMode) {
      const { orders } = this.props.state
      const { id } = this.props.state.modal;
      const order = getOrderById(orders, id)
      this.editManager.value = order.manager;
      this.editCustomer.value = order.customer;
      this.editName.value = order.name;
      this.editContacts.value = order.contacts;
      this.editPrice.value = order.price;
      this.editProduct.value = order.product;
    }
  }

  applyEdit = () => {
    const { year } = this.props.state.filter
    const { orders } = this.props.state
    const { id } = this.props.state.modal;
    const order = getOrderById(orders, id);
    const obj = {
      namber: order.namber,
      customer: this.editCustomer.value,
      date: order.date,
      name: this.editName.value,
      contacts: this.editContacts.value,
      product: order.product,
      price: Number(this.editPrice.value),
      passed: order.passed,
      manager: this.editManager.value
    }
    this.props.editOrder(id, obj)
    this.props.getData(year)
    this.props.alertSaccess('Данные о заказе успешно обновлены')
  }

  render() {
    const { orders } = this.props.state
    const { id } = this.props.state.modal;
    const order = getOrderById(orders, id)
    let editMode;

    let rule = !this.state.editMode ? true : false

    if (this.state.editMode) editMode = {
      getEditButton: 'times',
      applyButton: (
        <button type="button" className="btn btn-primary"
          onClick={ this.applyEdit }>
          Применить
        </button>
      ),
      manager: (
        <input className="editInput"
          ref={ (e) => { this.editManager = e }}
          type="text"/>
      ),
      customer: (
        <input className="editInput"
          ref={ (e) => { this.editCustomer = e }}
          type="text"/>
      ),
      date: order.date,
      name: (
        <input className="editInput"
          ref={ (e) => { this.editName = e }}
          type="text"/>
      ),
      contacts: (
        <input className="editInput"
          ref={ (e) => { this.editContacts = e }}
          type="text"/>
      ),
      price: (
        <input className="editInput"
          ref={ (e) => { this.editPrice = e }}
          type="text"/>
      ),
      product: (
        <input className="editInput"
          ref={ (e) => { this.editProduct = e }}
          type="text"/>
      ),
    }
    else editMode = {
      getEditButton: 'edit',
      applyButton: null,
      manager: order.manager,
      customer: order.customer,
      date: order.date,
      name: order.name,
      contacts: order.contacts,
      price: order.price,
      product: order.product[0]
    }

    return (
      <React.Fragment>
        <div className="modal-shadow"
          onClick={ () => this.props.hideModal() }>
        </div>
        <div className="edit-order">
          <div className="my-modal">
            <div className="my-modal-content">

              <div className="header">
                <h5>Закзак #{ order.namber }</h5>
                <button type="button" className="btn btn-link"
                  onClick={ () => this.setState({ editMode: rule }) }>
                  <i className={`fas fa-${ editMode.getEditButton }`}></i>
                </button>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="body">
                    <p><b>Исполнитель: </b>{ editMode.manager }</p>
                    <p><b>Заказчик: </b>{ editMode.customer }</p>
                    <p><b>Дата заказа: </b>{ editMode.date }</p>
                    <p><b>Контактное лицо: </b>{ editMode.name }</p>
                    <p><b>Контактные данные: </b>{ editMode.contacts }</p>
                    <p><b>Цена: </b>{ editMode.price }</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="body">
                    <p><b>Товары: </b></p>
                    <p>{ editMode.product }</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                  onClick={ () => this.props.hideModal() }>
                  Закрыть
                </button>
                { editMode.applyButton }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    alertSaccess: (text) => dispatch(alertSaccess(text)),
    getData: (year) =>dispatch(getData(year)),
    hideModal: () => dispatch(hideModal()),
    editOrder: (id, body) => dispatch(editOrder(id, body))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
