import React, {Component} from 'react';
import ReactHeatmap from './ReactHeatmap';
import './App.css';
import Background from './images/floor-plan.png';

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
                <div style={{
                    width: 3158/4,
                    height: 3389/4,
                    margin: "auto",
                    backgroundImage: "url(" + Background + ")",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
                }}>
                    <ReactHeatmap max={100} data={this.state.readings} unit={"percent"}/>
                </div>
            </div>
        );
    }
}

export default App;
