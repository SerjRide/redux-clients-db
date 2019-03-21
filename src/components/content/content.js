import React, { Component } from 'react';
// import Entrance from '../entrance';
import Table from '../content/table';
import { connect } from 'react-redux';
import AddOrder from './add-order';

class Content extends Component {

  render() {
    const { content } = this.props.state
    let mainContent;
    if (content === 'table') mainContent = <Table />;
    if (content === 'addOrder') mainContent = <AddOrder />;

    return (
      <div className="content">
        { mainContent }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Content);
