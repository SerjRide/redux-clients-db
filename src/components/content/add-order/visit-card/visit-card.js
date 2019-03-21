import React, { Component } from 'react';
import { calcVis } from '../../../../service'

class VisitCard extends Component {

  addVis = () => {
    const obj = {
      name: 'Визитки',
      tech: this.inputVisTech.value,
      count: this.inputVisCount.value,
      format: this.inputVisFormat.value,
      material: this.inputVisMaterial.value,
      colors: this.inputVisColors.value,
      lam: this.inputVisLam.value,
      border: this.inputVisBorder.checked,
      price: 0
    }
    obj.price = calcVis(obj);
    this.props.addProduct(obj);
  }

  render() {

    return (
      <form>
        <div className="form-row">

          <div className="form-group col-md-4">
            <label htmlFor="inputVisTech">
              Технология печати
            </label>
            <select id="inputVisTech"
              ref={(e) => { this.inputVisTech = e } }
              className="form-control">
              <option>Цифровая печать</option>
              <option>Офсетная печать</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputVisCount">
              Количество
            </label>
            <input type="text"
              ref={(e) => { this.inputVisCount = e } }
              id="inputVisCount"
              className="form-control"
              placeholder="Количество"/>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputVisFormat">
              Формат
            </label>
            <select id="inputVisFormat"
              ref={(e) => { this.inputVisFormat = e } }
              className="form-control">
              <option>90x50</option>
              <option>85x50</option>
              <option>Другой формат</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputVisMaterial">
              Бумага
            </label>
            <select id="inputVisMaterial"
              ref={(e) => { this.inputVisMaterial = e } }
              className="form-control">
              <option>Обычная</option>
              <option>Лён Слоновая кость</option>
              <option>Лён Бриллиант</option>
              <option>Touch Cover</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputVisColors">
              Цветность
            </label>
            <select id="inputVisColors"
              ref={(e) => { this.inputVisColors = e } }
              className="form-control">
              <option>1+0</option>
              <option>1+1</option>
              <option>4+0</option>
              <option>4+4</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputVisLam">
              Ламинация
            </label>
            <select id="inputVisLam"
              ref={(e) => { this.inputVisLam = e } }
              className="form-control">
              <option></option>
              <option>Матовая</option>
              <option>Глянцевая</option>
            </select>
          </div>

          <div className="form-group col-md-4">
          <button type="button"
            onClick={ this.addVis }
            className="btn btn-primary">
            Добавить
          </button>
          </div>

          <div className="form-check">
            <input className="form-check-input"
              ref={(e) => { this.inputVisBorder = e } }
              type="checkbox"
              id="inputVisBorder" />
            <label className="form-check-label" htmlFor="inputVisBorder">
              Скругление углов
            </label>
          </div>

        </div>
      </form>
    );
  }
}

export default VisitCard;
