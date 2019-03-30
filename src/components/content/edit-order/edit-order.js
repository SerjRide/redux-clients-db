import React, { Component } from 'react';
import { connect } from 'react-redux';

import { alertSaccess, delData, hideModal } from '../../../actions';

class EditOrder extends Component {

  render() {
    return (
      <React.Fragment>
      <div className="modal-shadow"
        onClick={ () => this.props.hideModal() }>
      </div>
      <div className="edit-order">
        <div className="my-modal">
          <div className="my-modal-content">
            <div className="header">
              <h5>Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"
                onClick={ () => this.props.hideModal() }>
                Закрыть
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
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
