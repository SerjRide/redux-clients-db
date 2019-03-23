import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertSaccess } from '../../actions';

class Alert extends Component {

  render() {

    setTimeout( () => this.props.alertSaccess(null), 2000 );

    const { type, text } = this.props.state.alert;

    let cl = type === 'success' ? "success" : "danger";

    return(
      <div className={ `alert alert-${cl}` }>
        { text }
      </div>
    )
  }
};

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return{ alertSaccess: (text) => dispatch(alertSaccess(text)) }
};
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
