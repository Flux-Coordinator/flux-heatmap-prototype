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
        this.timer = setInterval(this.fetch, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetch = () => {
        fetch('http://localhost:9000/measurements').then(results => {
            return results.json();
        }).then(data => {
            console.log("Fetched data:");
            let readings = data[0].readings.map((reading) => {
                let x = reading.xposition;
                let y = reading.yposition;
                let value = reading.luxValue;
                console.log(x + " : " + y + " : " + value);
                return {x: x, y: y, value: value};
            });
            this.setState({readings: readings});
        })
    };

    render() {
        return (
            <div className="App">
                <div style={{
                    width: 3158 / 4,
                    height: 3389 / 4,
                    margin: "auto",
                    backgroundImage: "url(" + Background + ")",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
                }}>
                    <ReactHeatmap max={100} data={this.state.readings} unit={"coordinates"} xOffset={400} yOffset={75}
                                  scaleFactor={0.035}/>
                </div>
            </div>
        );
    }
}

export default App;
