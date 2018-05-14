import * as React from "react";
import ReactHeatmap from './ReactHeatmap';
import './App.css';

class App extends React.Component {

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
            let readings = data[0].readings.map((reading) => {
                let x = reading.xposition;
                let y = reading.yposition;
                let value = reading.luxValue;
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
                }}>
                    <ReactHeatmap data={this.state.readings} xOffset={400} yOffset={75} scaleFactor={0.035}
                                  configObject={{
                                      radius: 10,
                                      maxOpacity: 0.5,
                                      minOpacity: 0,
                                      blur: 0.75
                                  }}/>
                </div>
            </div>
        );
    }
}

export default App;
