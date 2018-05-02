import React, {Component} from 'react';
import ReactHeatmap from './ReactHeatmap';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      readings: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:9000/measurements').then(results => {
      return results.json();
    }).then(data => {
      let readings = data[0].readings.map((reading) => {
        let x = reading.xposition * 100;
        let y = reading.yposition * 100;
        let value = reading.luxValue * 100;
        console.log(x + " : " + y + " : " + value);
        return {x: x, y: y, value: value};
      });
      this.setState({readings: readings});
    })
  }

  render() {
    return (
        <div className="App">
          <div style={{width: window.innerWidth, height: window.innerHeight}}>
            <ReactHeatmap max={100} data={this.state.readings} />
          </div>
        </div>
    );
  }
}

export default App;
