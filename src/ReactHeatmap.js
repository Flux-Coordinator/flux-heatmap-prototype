import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Heatmap from 'heatmapjs/build/heatmap.js';

class ReactHeatmap extends Component {

    constructor(props) {
        super(props);
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {
        this.heatmap = Heatmap.create({
            container: ReactDOM.findDOMNode(this)
        });
        this.setData(this.props.max, this.props.data);
    }

    componentWillReceiveProps(newProps) {
        this.setData(newProps.max, newProps.data);
    }

    setData(max, data) {
        if (data.length > 0) {
            console.log("Transformed data:");
            this.heatmap.setData({
                max: this.computeMax(max, data),
                data: this.computeData(data)
            });
        }
    }

    computeMax(max, data) {
        if (this.props.unit === 'coordinates') {
            let maxValue = Math.max(...data.map(v => parseInt(v.value, 10)));
            console.log("Max: " + maxValue);
            return maxValue;
        } else {
            return max;
        }
    }

    computeData(data) {
        let container = {};
        container.width = ReactDOM.findDOMNode(this).offsetWidth;
        container.height = ReactDOM.findDOMNode(this).offsetHeight;
        if (this.props.unit === 'percent') {
            return data.map(function (values, index) {
                return {
                    x: Math.round(values.x / 100 * container.width),
                    y: Math.round(values.y / 100 * container.height),
                    value: values.value
                };
            });
        } else if (this.props.unit === 'coordinates') {
            let transformation = {};
            transformation.xOffset = this.props.xOffset;
            transformation.yOffset = this.props.yOffset;
            transformation.scaleFactor = this.props.scaleFactor;
            return data.reduce(function (result, values) {
                let x = Math.round(values.x * transformation.scaleFactor + transformation.xOffset);
                let y = container.height - Math.round(values.y * transformation.scaleFactor + transformation.yOffset);
                console.log("-> " + x + " : " + y + " : " + values.value);
                if (x >= 0 && y >= 0 && x <= container.width && y <= container.height) {
                    result.push({
                        x: x,
                        y: y,
                        value: values.value
                    });
                }
                return result;
            }, []);
        } else {
            return data;
        }
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}></div>
        );
    }
}

ReactHeatmap.defaultProps = {
    max: 5,
    data: [],
    unit: 'coordinates',
    xOffset: 0,
    yOffset: 0,
    scaleFactor: 1
}

export default ReactHeatmap;
