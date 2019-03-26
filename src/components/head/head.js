import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData, showNavbar, changePeriod } from '../../actions';
import { Link } from 'react-router-dom';

class Head extends Component {

  componentDidMount() {
    this.inputYear.value = this.props.state.period.year;
    this.inputMounth.value = this.props.state.period.mounth;
    if (this.props.state.period.mounth === '') this.inputMounth.value = ''
  }

  applyPeriod = () => {
    const { value: year } = this.inputYear;
    const { value: mounth } = this.inputMounth;
    const { value: day } = this.inputDay;
    this.props.changePeriod(year, mounth, day);
    this.props.getData(year);
  }

  render() {
    return (
      <div className="head">
        <nav className="navbar navbar-light bg-light">
          <button
            className="btn"
            onClick={ () => this.props.showNavbar() }
            type="button">
            <i className="fas fa-bars"></i>
          </button>
          <Link className="navbar-brand"
            to="/">
            Redux Clients DB
          </Link>
          <div className="form">

          <div className="input-group">

              <div className="form-group col-md-5 filter first">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"/>
              </div>

              <div className="form-group col-md-2 filter middle">
                <select id="inputYear"
                  ref={ (e) => { this.inputYear = e} }
                  className="form-control">
                  <option value="19">2019</option>
                  <option value="18">2018</option>
                  <option value="17">2017</option>
                  <option value="16">2016</option>
                </select>
              </div>

              <div className="form-group col-md-2 filter middle">
                <select id="inputMounth"
                  ref={ (e) => { this.inputMounth = e} }
                  className="form-control">
                  <option value=''>Все месяцы</option>
                  <option value="01">Январь</option>
                  <option value="02">Февраль</option>
                  <option value="03">Март</option>
                  <option value="04">Апрель</option>
                  <option value="05">Май</option>
                  <option value="06">Июнь</option>
                  <option value="07">Июль</option>
                  <option value="08">Август</option>
                  <option value="09">Сентябрь</option>
                  <option value="10">Октябрь</option>
                  <option value="11">Ноябрь</option>
                  <option value="12">Декабрь</option>
                </select>
              </div>

              <div className="form-group col-md-1 filter middle">
                <input id="inputDay" type="number"
                  min="0" max="31"
                  ref={ (e) => { this.inputDay = e} }
                  className="form-control" />
              </div>

              <div className="form-group col-md-2 filter last">
              <button
                className="btn btn-outline-primary"
                onClick={ this.applyPeriod }
                type="button">
                <i className="fas fa-search"></i>
              </button>
              </div>

          </div>

            <div className="form-group col-md-2 end">
              <button
                className="btn btn-outline-danger"
                type="button">
                Выход
              </button>
            </div>

          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (url) => dispatch(getData(url)),
    showNavbar: () => dispatch(showNavbar()),
    changePeriod: (year, mounth, day) => dispatch(changePeriod(year, mounth, day))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Head);
