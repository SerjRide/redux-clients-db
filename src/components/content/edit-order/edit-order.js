import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderById } from '../../../service'

import { alertSaccess, delData, hideModal } from '../../../actions';

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

  render() {
    const { orders } = this.props.state
    const { id } = this.props.state.modal;
    const order = getOrderById(orders, id)
    let editMode;

    let rule = !this.state.editMode ? true : false

    if (this.state.editMode) editMode = {
      getEditButton: 'times',
      applyButton: (
        <button type="button" className="btn btn-primary">
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
    delData: (url) =>dispatch(delData(url)),
    hideModal: () => dispatch(hideModal())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditOrder);
