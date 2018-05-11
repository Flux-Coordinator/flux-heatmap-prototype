import * as React from "react";
import ReactDOM from 'react-dom';
import Heatmap from 'heatmapjs/build/heatmap.js';

export default class ReactHeatmap extends React.Component {

    props = {
        min: 0,
        max: 5,
        data: [],
        configObject: {
            radius: 10,
            maxOpacity: 0.5,
            minOpacity: 0,
            blur: 0.75
        },
        xOffset: 0,
        yOffset: 0,
        scaleFactor: 1
    };

    state = {
        elementHeight: 0,
        elementWidth: 0
    };

    constructor(props) {
        super(props);
        this.setData = this.setData.bind(this);
    }

    componentDidMount() {
        const height = this.divElement.clientHeight;
        const width = this.divElement.clientWidth;
        this.setState({elementHeight: height, elementWidth: width});

        const configObject = Object.assign({
            container: ReactDOM.findDOMNode(this)
        }, this.props.configObject);

        this.heatmap = Heatmap.create(configObject);

        this.setData(this.props.max, this.props.data);
    }

    componentWillReceiveProps(newProps) {
        this.setData(newProps.max, newProps.data);
    }

    setData(max, data) {
        if (data.length > 0) {
            console.log("Transformed data:");
            this.heatmap.setData({
                max: this.computeMax(data),
                data: this.transformData(data)
            });
        }
    }

    computeMax(data) {
        let maxValue = Math.max(...data.map(v => parseInt(v.value, 10)));
        console.log("Max: " + maxValue);
        return maxValue;
    }

    transformData(data) {
        let container = {};
        container.width = this.state.elementWidth;
        container.height = this.state.elementHeight;

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
    }

    render() {
        return (
            <div ref={divElement => (this.divElement = divElement)} style={{width: '100%', height: '100%'}}></div>
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
