import React, { Component } from 'react';
import './App.css';
import FoodData from './food.json';
import TrainingData from './training.json';

const VERSION = '0.0.2';

class App extends Component {
  constructor() {
    super();
    if ((localStorage.getItem('version') === null) || (localStorage.getItem('version') !== VERSION)) {
      localStorage.setItem('version', VERSION);
      this.state = {
        food: FoodData.map(function(value, index) {
          return ({
            'name': value.name,
            'level': 0,
            'cspent': 0,
            'c25': 0,
            'c50': 0,
            'c75': 0,
            'cMax': 0,
          })
        }),
        training: TrainingData.map(function(value, index) {
          return ({
            'name': value.name,
            'level': 0,
            'cspent': 0,
            'c25': 0,
            'c50': 0,
            'c75': 0,
            'cMax': 0,
          })
        })
      };
      this.state.food.push({
        'name': 'Total',
        'level': '-',
        'cspent': 0,
        'c25': 0,
        'c50': 0,
        'c75': 0,
        'cMax': 0,
      })
      this.state.training.push({
        'name': 'Total',
        'level': '-',
        'cspent': 0,
        'c25': 0,
        'c50': 0,
        'c75': 0,
        'cMax': 0,
      })
    } else {
      if (localStorage.getItem("state") === null) {
        this.state = {
          food: FoodData.map(function(value, index) {
            return ({
              'name': value.name,
              'level': 0,
              'cspent': 0,
              'c25': 0,
              'c50': 0,
              'c75': 0,
              'cMax': 0,
            })
          }),
          training: TrainingData.map(function(value, index) {
            return ({
              'name': value.name,
              'level': 0,
              'cspent': 0,
              'c25': 0,
              'c50': 0,
              'c75': 0,
              'cMax': 0,
            })
          })
        };
        this.state.food.push({
          'name': 'Total',
          'level': '-',
          'cspent': 0,
          'c25': 0,
          'c50': 0,
          'c75': 0,
          'cMax': 0,
        })
        this.state.training.push({
          'name': 'Total',
          'level': '-',
          'cspent': 0,
          'c25': 0,
          'c50': 0,
          'c75': 0,
          'cMax': 0,
        })
      } else {
        this.state = JSON.parse(localStorage.getItem("state"));
      }
    }
    this.handleChangeFood = this.handleChangeFood.bind(this);
    this.handleChangeTraining = this.handleChangeTraining.bind(this);
    this.calculateCostsFood = this.calculateCostsFood.bind(this);
    this.calculateCostsTraining = this.calculateCostsTraining.bind(this);
    this.resetFood = this.resetFood.bind(this);
    this.resetTraining = this.resetTraining.bind(this);
    this.firstRun = this.firstRun.bind(this);
  }

  componentDidMount() {
    this.firstRun();
  }

  firstRun() {
    var stateCopy = Object.assign({}, this.state);
    this.calculateCostsFood(stateCopy);
    this.calculateCostsTraining(stateCopy);
  }

  resetFood() {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.food = FoodData.map(function(value, index) {
        return ({
          'name': value.name,
          'level': 0,
          'c25': 0,
          'c50': 0,
          'c75': 0,
          'cMax': 0,
        })
      })
    stateCopy.food.push({
      'name': 'Total',
      'level': '-',
      'c25': 0,
      'c50': 0,
      'c75': 0,
      'cMax': 0,
    })
    this.calculateCostsFood(stateCopy);
  }

  resetTraining() {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.training = TrainingData.map(function(value, index) {
        return ({
          'name': value.name,
          'level': 0,
          'c25': 0,
          'c50': 0,
          'c75': 0,
          'cMax': 0,
        })
      })
    stateCopy.training.push({
      'name': 'Total',
      'level': '-',
      'c25': 0,
      'c50': 0,
      'c75': 0,
      'cMax': 0,
    })
    this.calculateCostsTraining(stateCopy);
  }

  calculateCostsFood(stateCopy) {
    var cspent = 0;
    var cspent = 0;
    var c25 = 0;
    var c50 = 0;
    var c75 = 0;
    var cMax = 0;

    stateCopy.food.forEach(function(actual_food, index, theArray) {
      if (actual_food.level !== '-') {
        cspent = FoodData[index].cost.slice(0, actual_food.level).reduce((sum, value) => sum + value, 0);
        c25 = FoodData[index].cost.slice(actual_food.level, 25).reduce((sum, value) => sum + value, 0);
        c50 = FoodData[index].cost.slice(actual_food.level, 50).reduce((sum, value) => sum + value, 0);
        c75 = FoodData[index].cost.slice(actual_food.level, 75).reduce((sum, value) => sum + value, 0);
        cMax = FoodData[index].cost.slice(actual_food.level).reduce((sum, value) => sum + value, 0);
        theArray[index]['cspent'] = cspent;
        theArray[index]['c25'] = c25;
        theArray[index]['c50'] = c50;
        theArray[index]['c75'] = c75;
        theArray[index]['cMax'] = cMax;
      } else {
        cspent = 0;
        c25 = 0;
        c50 = 0;
        c75 = 0;
        cMax = 0;
        theArray.forEach(function(item, key) {
          if (item.level !== '-') {
            cspent += item['cspent']
            c25 += item['c25']
            c50 += item['c50']
            c75 += item['c75']
            cMax += item['cMax']
          }
        })
        theArray[index]['cspent'] = cspent;
        theArray[index]['c25'] = c25;
        theArray[index]['c50'] = c50;
        theArray[index]['c75'] = c75;
        theArray[index]['cMax'] = cMax;
      }
    })
    this.setState(stateCopy);
    localStorage.setItem('state', JSON.stringify(this.state));
  }
  calculateCostsTraining(stateCopy) {
    var cspent = 0;
    var c25 = 0;
    var c50 = 0;
    var c75 = 0;
    var cMax = 0;

    stateCopy.training.forEach(function(actual_training, index, theArray) {
      if (actual_training.level !== '-') {
        cspent = TrainingData[index].cost.slice(0, actual_training.level).reduce((sum, value) => sum + value, 0);
        c25 = TrainingData[index].cost.slice(actual_training.level, 25).reduce((sum, value) => sum + value, 0);
        c50 = TrainingData[index].cost.slice(actual_training.level, 50).reduce((sum, value) => sum + value, 0);
        c75 = TrainingData[index].cost.slice(actual_training.level, 75).reduce((sum, value) => sum + value, 0);
        cMax = TrainingData[index].cost.slice(actual_training.level).reduce((sum, value) => sum + value, 0);
        theArray[index]['cspent'] = cspent;
        theArray[index]['c25'] = c25;
        theArray[index]['c50'] = c50;
        theArray[index]['c75'] = c75;
        theArray[index]['cMax'] = cMax;
      } else {
        cspent = 0;
        c25 = 0;
        c50 = 0;
        c75 = 0;
        cMax = 0;
        theArray.forEach(function(item, key) {
          if (item.level !== '-') {
            cspent += item['cspent']
            c25 += item['c25']
            c50 += item['c50']
            c75 += item['c75']
            cMax += item['cMax']
          }
        })
        theArray[index]['cspent'] = cspent;
        theArray[index]['c25'] = c25;
        theArray[index]['c50'] = c50;
        theArray[index]['c75'] = c75;
        theArray[index]['cMax'] = cMax;
      }
    })
    this.setState(stateCopy);
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleClick(event) {
    event.target.select();
  }

  handleChangeFood(event) {
    var stateCopy = Object.assign({}, this.state);
    var number = 0;
    if (!isNaN(parseInt(event.target.value, 0))) {
      if (parseInt(event.target.value, 0) > 100) {
        number = 100;
      } else if (parseInt(event.target.value, 0) < 0){
        number = 0
      } else {
        number = parseInt(event.target.value, 0)
      }
    }
    stateCopy.food[event.target.id].level = number;
    this.calculateCostsFood(stateCopy);
  }

  handleChangeTraining(event) {
    var stateCopy = Object.assign({}, this.state);
    var number = 0;
    if (!isNaN(parseInt(event.target.value, 0))) {
      if (parseInt(event.target.value, 0) > 100) {
        number = 100;
      } else if (parseInt(event.target.value, 0) < 0){
        number = 0
      } else {
        number = parseInt(event.target.value, 0)
      }
    }
    stateCopy.training[event.target.id].level = number;
    this.calculateCostsTraining(stateCopy);
  }

  render() {
    var food = this.state.food.map(function(value, index) {
      return (
        <tr key={index}>
          <td>{value.name}</td>
          <td><input className="level-input" type="text" value={this.state.food[index].level} id={index} onChange={this.handleChangeFood} onClick={this.handleClick}/></td>
          <td>{this.state.food[index].cspent.toLocaleString()}</td>
          <td>{this.state.food[index].c25.toLocaleString()}</td>
          <td>{this.state.food[index].c50.toLocaleString()}</td>
          <td>{this.state.food[index].c75.toLocaleString()}</td>
          <td>{this.state.food[index].cMax.toLocaleString()}</td>
        </tr>
      );
    }, this)
    var training = this.state.training.map(function(value, index) {
      return (
        <tr key={index}>
          <td>{value.name}</td>
          <td><input className="level-input" type="text" value={this.state.training[index].level} id={index} onChange={this.handleChangeTraining} onClick={this.handleClick}/></td>
          <td>{this.state.training[index].cspent.toLocaleString()}</td>
          <td>{this.state.training[index].c25.toLocaleString()}</td>
          <td>{this.state.training[index].c50.toLocaleString()}</td>
          <td>{this.state.training[index].c75.toLocaleString()}</td>
          <td>{this.state.training[index].cMax.toLocaleString()}</td>
        </tr>
      );
    }, this)
    return (
      <div className="App">
        <div className="version">v{VERSION}</div>
        <div className="half-screen">
          <div className="wrapper">
            <div className="wrapper-cell">Foods</div>
            <div className="wrapper-cell"><button className="btn btn-reset" onClick={this.resetFood}>Reset</button></div>
          </div>
          <table className="tables">
            <thead>
              <tr>
                <th className="table-name" rowSpan="2">Name</th>
                <th className="level-column" rowSpan="2">Level</th>
                <th className="table-spent" rowSpan="2">Coins Spent</th>
                <th className="table-levels-h"colSpan="4">Coins to upgrade by lvl</th>
              </tr>
              <tr>
                <th className="table-levels">25</th>
                <th className="table-levels">50</th>
                <th className="table-levels">75</th>
                <th className="table-levels">100</th>
              </tr>
            </thead>
            <tbody>
              {food}
            </tbody>
          </table>
        </div>
        <div className="half-screen">
          <div className="wrapper">
            <div className="wrapper-cell">Trainings</div>
            <div className="wrapper-cell"><button className="btn btn-reset" onClick={this.resetTraining}>Reset</button></div>
          </div>
          <table className="tables">
            <thead>
              <tr>
                <th className="table-name" rowSpan="2">Name</th>
                <th className="level-column" rowSpan="2">Level</th>
                <th className="table-spent" rowSpan="2">Coins Spent</th>
                <th className="table-levels-h"colSpan="4">Coins to upgrade by lvl</th>
              </tr>
              <tr>
                <th className="table-levels">25</th>
                <th className="table-levels">50</th>
                <th className="table-levels">75</th>
                <th className="table-levels">100</th>
              </tr>
            </thead>
            <tbody>
              {training}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
