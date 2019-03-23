import React, { Component } from 'react';
import { connect } from 'react-redux';

import { alertSaccess, delData } from '../../../actions';

class DeleteOrder extends Component {

  getId = (orders, value) => {
    let newValue = false
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].namber === Number(value)) {
        newValue = orders[i]._id
        return newValue
      }
    }
  }

  delOrder = () => {
    const { orders } = this.props.state;
    let { value } = this.deleteInput;
    let id = this.getId(orders, value);

    if (!id) this.props.alertSaccess('Запись не найдена');
    else {
      console.log(id);
      this.props.delData(id);
      this.props.alertSaccess('Запись успешно удалена');
      this.deleteInput.value = '';
    }
  };

  render() {

    const content = (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <input type="text"
              ref={(e) => { this.deleteInput = e }}
              className="form-control"
              placeholder="Номер заказа"/>
          </div>
          <div className="form-group col-md-6">
            <button type="button"
              onClick={ this.delOrder }
              className="btn btn-danger">
              Удалить Заказ
            </button>
          </div>
        </div>
      </form>
    )

    return (
      <div className="del-order">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              Удалить заказ
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      { content }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    alertSaccess: (text) => dispatch(alertSaccess(text)),
    delData: (url) =>dispatch(delData(url))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteOrder);
