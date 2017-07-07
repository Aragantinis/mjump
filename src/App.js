import React, { Component } from 'react';
import './App.css';
import FoodData from './food.json';
import TrainingData from './training.json';

const VERSION = '0.0.3';

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
            'actualcoin': 0,
            'actualjp': 0,
            'c25coin': 0,
            'c25jp': 0,
            'c50coin': 0,
            'c50jp': 0,
            'c75coin': 0,
            'c75jp': 0,
            'cMaxcoin': 0,
            'cMaxjp': 0,
            'clevel': 0,
            'ccoin': 0,
            'cjp': 0,
          })
        }),
        training: TrainingData.map(function(value, index) {
          return ({
            'name': value.name,
            'level': 0,
            'actualcoin': 0,
            'actualjp': 0,
            'c25coin': 0,
            'c25jp': 0,
            'c50coin': 0,
            'c50jp': 0,
            'c75coin': 0,
            'c75jp': 0,
            'cMaxcoin': 0,
            'cMaxjp': 0,
            'clevel': 0,
            'ccoin': 0,
            'cjp': 0,
          })
        })
      };
      this.state.food.push({
        'name': 'Total',
        'level': '-',
        'actualcoin': 0,
        'actualjp': 0,
        'c25coin': 0,
        'c25jp': 0,
        'c50coin': 0,
        'c50jp': 0,
        'c75coin': 0,
        'c75jp': 0,
        'cMaxcoin': 0,
        'cMaxjp': 0,
        'clevel': 0,
        'ccoin': 0,
        'cjp': 0,
      })
      this.state.training.push({
        'name': 'Total',
        'level': '-',
        'actualcoin': 0,
        'actualjp': 0,
        'c25coin': 0,
        'c25jp': 0,
        'c50coin': 0,
        'c50jp': 0,
        'c75coin': 0,
        'c75jp': 0,
        'cMaxcoin': 0,
        'cMaxjp': 0,
        'clevel': 0,
        'ccoin': 0,
        'cjp': 0,
      })
    } else {
      if (localStorage.getItem("state") === null) {
        this.state = {
          food: FoodData.map(function(value, index) {
            return ({
              'name': value.name,
              'level': 0,
              'actualcoin': 0,
              'actualjp': 0,
              'c25coin': 0,
              'c25jp': 0,
              'c50coin': 0,
              'c50jp': 0,
              'c75coin': 0,
              'c75jp': 0,
              'cMaxcoin': 0,
              'cMaxjp': 0,
              'clevel': 0,
              'ccoin': 0,
              'cjp': 0,
            })
          }),
          training: TrainingData.map(function(value, index) {
            return ({
              'name': value.name,
              'level': 0,
              'actualcoin': 0,
              'actualjp': 0,
              'c25coin': 0,
              'c25jp': 0,
              'c50coin': 0,
              'c50jp': 0,
              'c75coin': 0,
              'c75jp': 0,
              'cMaxcoin': 0,
              'cMaxjp': 0,
              'clevel': 0,
              'ccoin': 0,
              'cjp': 0,
            })
          })
        };
        this.state.food.push({
          'name': 'Total',
          'level': '-',
          'actualcoin': 0,
          'actualjp': 0,
          'c25coin': 0,
          'c25jp': 0,
          'c50coin': 0,
          'c50jp': 0,
          'c75coin': 0,
          'c75jp': 0,
          'cMaxcoin': 0,
          'cMaxjp': 0,
          'clevel': 0,
          'ccoin': 0,
          'cjp': 0,
        })
        this.state.training.push({
          'name': 'Total',
          'level': '-',
          'actualcoin': 0,
          'actualjp': 0,
          'c25coin': 0,
          'c25jp': 0,
          'c50coin': 0,
          'c50jp': 0,
          'c75coin': 0,
          'c75jp': 0,
          'cMaxcoin': 0,
          'cMaxjp': 0,
          'clevel': 0,
          'ccoin': 0,
          'cjp': 0,
        })
      } else {
        this.state = JSON.parse(localStorage.getItem("state"));
      }
    }
    this.handleChangeFood = this.handleChangeFood.bind(this);
    this.handleChangeTraining = this.handleChangeTraining.bind(this);
    this.handleAddFood = this.handleAddFood.bind(this);
    this.handleSubtractFood = this.handleSubtractFood.bind(this);
    this.handleAddTraining = this.handleAddTraining.bind(this);
    this.handleSubtractTraining = this.handleSubtractTraining.bind(this);

    this.handleChangeCustomFood = this.handleChangeCustomFood.bind(this);
    this.handleChangeCustomTraining = this.handleChangeCustomTraining.bind(this);
    this.handleAddCustomFood = this.handleAddCustomFood.bind(this);
    this.handleSubtractCustomFood = this.handleSubtractCustomFood.bind(this);
    this.handleAddCustomTraining = this.handleAddCustomTraining.bind(this);
    this.handleSubtractCustomTraining = this.handleSubtractCustomTraining.bind(this);

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
          'actualcoin': 0,
          'actualjp': 0,
          'c25coin': 0,
          'c25jp': 0,
          'c50coin': 0,
          'c50jp': 0,
          'c75coin': 0,
          'c75jp': 0,
          'cMaxcoin': 0,
          'cMaxjp': 0,
          'clevel': 0,
          'ccoin': 0,
          'cjp': 0,
        })
      })
    stateCopy.food.push({
      'name': 'Total',
      'level': '-',
      'actualcoin': 0,
      'actualjp': 0,
      'c25coin': 0,
      'c25jp': 0,
      'c50coin': 0,
      'c50jp': 0,
      'c75coin': 0,
      'c75jp': 0,
      'cMaxcoin': 0,
      'cMaxjp': 0,
      'clevel': 0,
      'ccoin': 0,
      'cjp': 0,
    })
    this.calculateCostsFood(stateCopy);
  }

  resetTraining() {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.training = TrainingData.map(function(value, index) {
        return ({
          'name': value.name,
          'level': 0,
          'actualcoin': 0,
          'actualjp': 0,
          'c25coin': 0,
          'c25jp': 0,
          'c50coin': 0,
          'c50jp': 0,
          'c75coin': 0,
          'c75jp': 0,
          'cMaxcoin': 0,
          'cMaxjp': 0,
          'clevel': 0,
          'ccoin': 0,
          'cjp': 0,
        })
      })
    stateCopy.training.push({
      'name': 'Total',
      'level': '-',
      'actualcoin': 0,
      'actualjp': 0,
      'c25coin': 0,
      'c25jp': 0,
      'c50coin': 0,
      'c50jp': 0,
      'c75coin': 0,
      'c75jp': 0,
      'cMaxcoin': 0,
      'cMaxjp': 0,
      'clevel': 0,
      'ccoin': 0,
      'cjp': 0,
    })
    this.calculateCostsTraining(stateCopy);
  }

  calculateCostsFood(stateCopy) {
    var actualcoin = 0;
    var actualjp = 0;
    var c25coin = 0;
    var c25jp = 0;
    var c50coin = 0;
    var c50jp = 0;
    var c75coin = 0;
    var c75jp = 0;
    var cMaxcoin = 0;
    var cMaxjp = 0;
    var ccoin = 0;
    var cjp = 0;

    stateCopy.food.forEach(function(actual_food, index, theArray) {
      if (actual_food.level !== '-') {
        actualcoin = FoodData[index].cost.slice(0, actual_food.level).reduce((sum, value) => sum + value, 0);
        c25coin = FoodData[index].cost.slice(actual_food.level, 25).reduce((sum, value) => sum + value, 0);
        c50coin = FoodData[index].cost.slice(actual_food.level, 50).reduce((sum, value) => sum + value, 0);
        c75coin = FoodData[index].cost.slice(actual_food.level, 75).reduce((sum, value) => sum + value, 0);
        cMaxcoin = FoodData[index].cost.slice(actual_food.level).reduce((sum, value) => sum + value, 0);
        if (actual_food.level !== 0) {
          actualjp = FoodData[index].power[actual_food.level - 1];
        } else {
          actualjp = 0;
        }
        theArray[index]['actualcoin'] = actualcoin;
        theArray[index]['actualjp'] = actualjp;
        theArray[index]['c25coin'] = c25coin;
        theArray[index]['c50coin'] = c50coin;
        theArray[index]['c75coin'] = c75coin;
        theArray[index]['cMaxcoin'] = cMaxcoin;

        if (actual_food.level >= 25 && actual_food.level < 50) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = FoodData[index].power[50 - 1] - actualjp;
          theArray[index]['c75jp'] = FoodData[index].power[75 - 1] - actualjp;
          theArray[index]['cMaxjp'] = FoodData[index].power[100 - 1] - actualjp;
        } else if (actual_food.level >= 50 && actual_food.level < 75) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = 0;
          theArray[index]['c75jp'] = FoodData[index].power[75 - 1] - actualjp;
          theArray[index]['cMaxjp'] = FoodData[index].power[100 - 1] - actualjp;
        } else if (actual_food.level >= 75 && actual_food.level < 100) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = 0;
          theArray[index]['c75jp'] = 0;
          theArray[index]['cMaxjp'] = FoodData[index].power[100 - 1] - actualjp;
        } else if (actual_food.level === 100) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = 0;
          theArray[index]['c75jp'] = 0;
          theArray[index]['cMaxjp'] = 0;
        } else {
          theArray[index]['c25jp'] = FoodData[index].power[25 - 1] - actualjp;
          theArray[index]['c50jp'] = FoodData[index].power[50 - 1] - actualjp;
          theArray[index]['c75jp'] = FoodData[index].power[75 - 1] - actualjp;
          theArray[index]['cMaxjp'] = FoodData[index].power[100 - 1] - actualjp;
        }
        if (actual_food.level < actual_food.clevel) {
          ccoin = FoodData[index].cost.slice(actual_food.level, actual_food.clevel).reduce((sum, value) => sum + value, 0);
          cjp = FoodData[index].power[actual_food.clevel - 1] - actualjp;
        } else {
          ccoin = 0;
          cjp = 0;
        }
        theArray[index]['ccoin'] = ccoin;
        theArray[index]['cjp'] = cjp;
      } else {
        actualcoin = 0;
        actualjp = 0;
        c25coin = 0;
        c25jp = 0;
        c50coin = 0;
        c50jp = 0;
        c75coin = 0;
        c75jp = 0;
        cMaxcoin = 0;
        cMaxjp = 0;
        ccoin = 0;
        cjp = 0;
        theArray.forEach(function(item, key) {
          if (item.level !== '-') {
            actualcoin += item['actualcoin']
            actualjp += item['actualjp']
            c25coin += item['c25coin']
            c25jp += item['c25jp']
            c50coin += item['c50coin']
            c50jp += item['c50jp']
            c75coin += item['c75coin']
            c75jp += item['c75jp']
            cMaxcoin += item['cMaxcoin']
            cMaxjp += item['cMaxjp']
            ccoin += item['ccoin']
            cjp += item['cjp']
          }
        })
        theArray[index]['actualcoin'] = actualcoin;
        theArray[index]['actualjp'] = actualjp;
        theArray[index]['c25coin'] = c25coin;
        theArray[index]['c25jp'] = c25jp;
        theArray[index]['c50coin'] = c50coin;
        theArray[index]['c50jp'] = c50jp;
        theArray[index]['c75coin'] = c75coin;
        theArray[index]['c75jp'] = c75jp;
        theArray[index]['cMaxcoin'] = cMaxcoin;
        theArray[index]['cMaxjp'] = cMaxjp;
        theArray[index]['ccoin'] = ccoin;
        theArray[index]['cjp'] = cjp;
      }
    })
    this.setState(stateCopy);
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  calculateCostsTraining(stateCopy) {
    var actualcoin = 0;
    var actualjp = 0;
    var c25coin = 0;
    var c25jp = 0;
    var c50coin = 0;
    var c50jp = 0;
    var c75coin = 0;
    var c75jp = 0;
    var cMaxcoin = 0;
    var cMaxjp = 0;
    var ccoin = 0;
    var cjp = 0;

    stateCopy.training.forEach(function(actual_training, index, theArray) {
      if (actual_training.level !== '-') {
        actualcoin = TrainingData[index].cost.slice(0, actual_training.level).reduce((sum, value) => sum + value, 0);
        c25coin = TrainingData[index].cost.slice(actual_training.level, 25).reduce((sum, value) => sum + value, 0);
        c50coin = TrainingData[index].cost.slice(actual_training.level, 50).reduce((sum, value) => sum + value, 0);
        c75coin = TrainingData[index].cost.slice(actual_training.level, 75).reduce((sum, value) => sum + value, 0);
        cMaxcoin = TrainingData[index].cost.slice(actual_training.level).reduce((sum, value) => sum + value, 0);
        if (actual_training.level !== 0) {
          actualjp = TrainingData[index].power[actual_training.level - 1];
        } else {
          actualjp = 0;
        }
        theArray[index]['actualcoin'] = actualcoin;
        theArray[index]['actualjp'] = actualjp;
        theArray[index]['c25coin'] = c25coin;
        theArray[index]['c50coin'] = c50coin;
        theArray[index]['c75coin'] = c75coin;
        theArray[index]['cMaxcoin'] = cMaxcoin;

        if (actual_training.level >= 25 && actual_training.level < 50) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = TrainingData[index].power[50 - 1] - actualjp;
          theArray[index]['c75jp'] = TrainingData[index].power[75 - 1] - actualjp;
          theArray[index]['cMaxjp'] = TrainingData[index].power[100 - 1] - actualjp;
        } else if (actual_training.level >= 50 && actual_training.level < 75) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = 0;
          theArray[index]['c75jp'] = TrainingData[index].power[75 - 1] - actualjp;
          theArray[index]['cMaxjp'] = TrainingData[index].power[100 - 1] - actualjp;
        } else if (actual_training.level >= 75 && actual_training.level < 100) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = 0;
          theArray[index]['c75jp'] = 0;
          theArray[index]['cMaxjp'] = TrainingData[index].power[100 - 1] - actualjp;
        } else if (actual_training.level === 100) {
          theArray[index]['c25jp'] = 0;
          theArray[index]['c50jp'] = 0;
          theArray[index]['c75jp'] = 0;
          theArray[index]['cMaxjp'] = 0;
        } else {
          theArray[index]['c25jp'] = TrainingData[index].power[25 - 1] - actualjp;
          theArray[index]['c50jp'] = TrainingData[index].power[50 - 1] - actualjp;
          theArray[index]['c75jp'] = TrainingData[index].power[75 - 1] - actualjp;
          theArray[index]['cMaxjp'] = TrainingData[index].power[100 - 1] - actualjp;
        }
        if (actual_training.level < actual_training.clevel) {
          ccoin = TrainingData[index].cost.slice(actual_training.level, actual_training.clevel).reduce((sum, value) => sum + value, 0);
          cjp = TrainingData[index].power[actual_training.clevel - 1] - actualjp;
        } else {
          ccoin = 0;
          cjp = 0;
        }
        theArray[index]['ccoin'] = ccoin;
        theArray[index]['cjp'] = cjp;
      } else {
        actualcoin = 0;
        actualjp = 0;
        c25coin = 0;
        c25jp = 0;
        c50coin = 0;
        c50jp = 0;
        c75coin = 0;
        c75jp = 0;
        cMaxcoin = 0;
        cMaxjp = 0;
        ccoin = 0;
        cjp = 0;
        theArray.forEach(function(item, key) {
          if (item.level !== '-') {
            actualcoin += item['actualcoin']
            actualjp += item['actualjp']
            c25coin += item['c25coin']
            c25jp += item['c25jp']
            c50coin += item['c50coin']
            c50jp += item['c50jp']
            c75coin += item['c75coin']
            c75jp += item['c75jp']
            cMaxcoin += item['cMaxcoin']
            cMaxjp += item['cMaxjp']
            ccoin += item['ccoin']
            cjp += item['cjp']
          }
        })
        theArray[index]['actualcoin'] = actualcoin;
        theArray[index]['actualjp'] = actualjp;
        theArray[index]['c25coin'] = c25coin;
        theArray[index]['c25jp'] = c25jp;
        theArray[index]['c50coin'] = c50coin;
        theArray[index]['c50jp'] = c50jp;
        theArray[index]['c75coin'] = c75coin;
        theArray[index]['c75jp'] = c75jp;
        theArray[index]['cMaxcoin'] = cMaxcoin;
        theArray[index]['cMaxjp'] = cMaxjp;
        theArray[index]['ccoin'] = ccoin;
        theArray[index]['cjp'] = cjp;
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

  handleChangeCustomFood(event) {
    var stateCopy = Object.assign({}, this.state);
    var index = parseInt(event.target.id.replace('c_', ''), 10);
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
    stateCopy.food[index].clevel = number;
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

  handleChangeCustomTraining(event) {
    var stateCopy = Object.assign({}, this.state);
    var index = parseInt(event.target.id.replace('c_', ''), 10);
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
    stateCopy.training[index].clevel = number;
    this.calculateCostsTraining(stateCopy);
  }

  handleAddFood(event) {
    var index = parseInt(event.target.id.replace('add_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var level = stateCopy.food[index].level + 1;
    if (level > 100) {
      level = 100;
    }
    stateCopy.food[index].level = level;
    this.calculateCostsFood(stateCopy);
  }

  handleAddCustomFood(event) {
    var index = parseInt(event.target.id.replace('add_c_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var clevel = stateCopy.food[index].clevel + 1;
    if (clevel > 100) {
      clevel = 100;
    }
    stateCopy.food[index].clevel = clevel;
    this.calculateCostsFood(stateCopy);
  }

  handleSubtractFood(event) {
    var index = parseInt(event.target.id.replace('subtract_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var level = stateCopy.food[index].level - 1;
    if (level < 0) {
      level = 0;
    }
    stateCopy.food[index].level = level;
    this.calculateCostsFood(stateCopy);
  }

  handleSubtractCustomFood(event) {
    var index = parseInt(event.target.id.replace('subtract_c_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var clevel = stateCopy.food[index].clevel - 1;
    if (clevel < 0) {
      clevel = 0;
    }
    stateCopy.food[index].clevel = clevel;
    this.calculateCostsFood(stateCopy);
  }

  handleAddTraining(event) {
    var index = parseInt(event.target.id.replace('add_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var level = stateCopy.training[index].level + 1;
    if (level > 100) {
      level = 100;
    }
    stateCopy.training[index].level = level;
    this.calculateCostsTraining(stateCopy);
  }

  handleAddCustomTraining(event) {
    var index = parseInt(event.target.id.replace('add_c_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var clevel = stateCopy.training[index].clevel + 1;
    if (clevel > 100) {
      clevel = 100;
    }
    stateCopy.training[index].clevel = clevel;
    this.calculateCostsTraining(stateCopy);
  }

  handleSubtractTraining(event) {
    var index = parseInt(event.target.id.replace('subtract_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var level = stateCopy.training[index].level - 1;
    if (level < 0) {
      level = 0;
    }
    stateCopy.training[index].level = level;
    this.calculateCostsTraining(stateCopy);
  }

  handleSubtractCustomTraining(event) {
    var index = parseInt(event.target.id.replace('subtract_c_', ''), 10);
    var stateCopy = Object.assign({}, this.state);
    var clevel = stateCopy.training[index].clevel - 1;
    if (clevel < 0) {
      clevel = 0;
    }
    stateCopy.training[index].clevel = clevel;
    this.calculateCostsTraining(stateCopy);
  }

  render() {
    var totalfood = this.state.food.length;
    var totaltraining = this.state.training.length;
    var food = this.state.food.map(function(value, index) {
      return (
        <tr key={index} className={(this.state.food[index].level === '-') ? 'datarow totalrow' : 'datarow'}>
          <td>{value.name}</td>
          <td>
            {this.state.food[index].level === '-' &&
              this.state.food[index].level
            }
            {this.state.food[index].level !== '-' &&
              <table>
                <tbody>
                  <tr>
                    <td><button id={'subtract_' + index} className="aritimetic-input minus-input" onClick={this.handleSubtractFood}>-</button></td>
                    <td><input tabIndex={index + 1} className="level-input" type="text" value={this.state.food[index].level} id={index} onChange={this.handleChangeFood} onClick={this.handleClick}/></td>
                    <td><button id={'add_' + index} className="aritimetic-input plus-input" onClick={this.handleAddFood}>+</button></td>
                  </tr>
                </tbody>
              </table>
            }
          </td>
          <td>{this.state.food[index].actualjp.toLocaleString()}</td>
          <td>{this.state.food[index].actualcoin.toLocaleString()}</td>
          <td>{this.state.food[index].c25jp.toLocaleString()}</td>
          <td>{this.state.food[index].c25coin.toLocaleString()}</td>
          <td>{this.state.food[index].c50jp.toLocaleString()}</td>
          <td>{this.state.food[index].c50coin.toLocaleString()}</td>
          <td>{this.state.food[index].c75jp.toLocaleString()}</td>
          <td>{this.state.food[index].c75coin.toLocaleString()}</td>
          <td>{this.state.food[index].cMaxjp.toLocaleString()}</td>
          <td>{this.state.food[index].cMaxcoin.toLocaleString()}</td>
          <td>
            {this.state.food[index].level === '-' &&
              this.state.food[index].level
            }
            {this.state.food[index].level !== '-' &&
              <table>
                <tbody>
                  <tr>
                    <td><button id={'subtract_c_' + index} className="aritimetic-input minus-input" onClick={this.handleSubtractCustomFood}>-</button></td>
                    <td><input tabIndex={totalfood + totaltraining + index - 1} className="level-input" type="text" value={this.state.food[index].clevel} id={'c_' + index} onChange={this.handleChangeCustomFood} onClick={this.handleClick}/></td>
                    <td><button id={'add_c_' + index} className="aritimetic-input plus-input" onClick={this.handleAddCustomFood}>+</button></td>
                  </tr>
                </tbody>
              </table>
            }
          </td>
          <td>{this.state.food[index].cjp.toLocaleString()}</td>
          <td>{this.state.food[index].ccoin.toLocaleString()}</td>
        </tr>
      );
    }, this)
    var training = this.state.training.map(function(value, index) {
      return (
        <tr key={index} className={(this.state.training[index].level === '-') ? 'datarow totalrow' : 'datarow'}>
          <td>{value.name}</td>
          <td>
            {this.state.training[index].level === '-' &&
              this.state.training[index].level
            }
            {this.state.training[index].level !== '-' &&
              <table>
                <tbody>
                  <tr>
                    <td><button id={'subtract_' + index} className="aritimetic-input minus-input" onClick={this.handleSubtractTraining}>-</button></td>
                    <td><input tabIndex={totalfood + index} className="level-input" type="text" value={this.state.training[index].level} id={index} onChange={this.handleChangeTraining} onClick={this.handleClick}/></td>
                    <td><button id={'add_' + index} className="aritimetic-input plus-input" onClick={this.handleAddTraining}>+</button></td>
                  </tr>
                </tbody>
              </table>
            }
          </td>
          <td>{this.state.training[index].actualjp.toLocaleString()}</td>
          <td>{this.state.training[index].actualcoin.toLocaleString()}</td>
          <td>{this.state.training[index].c25jp.toLocaleString()}</td>
          <td>{this.state.training[index].c25coin.toLocaleString()}</td>
          <td>{this.state.training[index].c50jp.toLocaleString()}</td>
          <td>{this.state.training[index].c50coin.toLocaleString()}</td>
          <td>{this.state.training[index].c75jp.toLocaleString()}</td>
          <td>{this.state.training[index].c75coin.toLocaleString()}</td>
          <td>{this.state.training[index].cMaxjp.toLocaleString()}</td>
          <td>{this.state.training[index].cMaxcoin.toLocaleString()}</td>
          <td>
            {this.state.training[index].level === '-' &&
              this.state.training[index].level
            }
            {this.state.training[index].level !== '-' &&
              <table>
                <tbody>
                  <tr>
                    <td><button id={'subtract_c_' + index} className="aritimetic-input minus-input" onClick={this.handleSubtractCustomTraining}>-</button></td>
                    <td><input tabIndex={totalfood + totaltraining + totalfood + index - 2} className="level-input" type="text" value={this.state.training[index].clevel} id={'c_' + index} onChange={this.handleChangeCustomTraining} onClick={this.handleClick}/></td>
                    <td><button id={'add_c_' + index} className="aritimetic-input plus-input" onClick={this.handleAddCustomTraining}>+</button></td>
                  </tr>
                </tbody>
              </table>
            }
          </td>
          <td>{this.state.training[index].cjp.toLocaleString()}</td>
          <td>{this.state.training[index].ccoin.toLocaleString()}</td>
        </tr>
      );
    }, this)
    return (
      <div className="App">
        <div className="navbar">
          <h1>MJump <span>v{VERSION}</span></h1>
          <div className="controls">
            <button className="btn" onClick={this.resetFood}>Reset Food</button>
            <button className="btn" onClick={this.resetTraining}>Reset Training</button>
          </div>
        </div>
        <table className="tables">
          <tbody>
            <tr className="headerrow">
              <th className="title-column food-column" rowSpan={this.state.food.length + 2}><div>Foods</div></th>
              <th className="table-name" rowSpan="2">Name</th>
              <th className="level-column" rowSpan="2">Level</th>
              <th className="table-spent" colSpan="2">Actual Level</th>
              <th className="lvl-header" colSpan="2">LVL 25</th>
              <th className="lvl-header" colSpan="2">LVL 50</th>
              <th className="lvl-header" colSpan="2">LVL 75</th>
              <th className="lvl-header" colSpan="2">LVL 100</th>
              <th className="lvl-header" colSpan="3">CUSTOM</th>
            </tr>
            <tr className="headerrow">
              <th className="column-info">JP</th>
              <th className="column-info">Coins Spent</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="level-column">LVL</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
            </tr>
            {food}
            <tr className="separete-row">
              <td colSpan="16"></td>
            </tr>
            <tr className="headerrow">
              <th className="title-column training-column" rowSpan={this.state.training.length + 2}><div>Trainings</div></th>
              <th className="table-name" rowSpan="2">Name</th>
              <th className="level-column" rowSpan="2">Level</th>
              <th className="table-spent" colSpan="2">Actual Level</th>
              <th className="lvl-header" colSpan="2">LVL 25</th>
              <th className="lvl-header" colSpan="2">LVL 50</th>
              <th className="lvl-header" colSpan="2">LVL 75</th>
              <th className="lvl-header" colSpan="2">LVL 100</th>
              <th className="lvl-header" colSpan="3">CUSTOM</th>
            </tr>
            <tr className="headerrow">
              <th className="column-info">JP</th>
              <th className="column-info">Coins Spent</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
              <th className="level-column">LVL</th>
              <th className="column-info">JP</th>
              <th className="column-info">Coin</th>
            </tr>
            {training}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
