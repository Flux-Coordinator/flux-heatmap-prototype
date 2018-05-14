import * as React from "react";
import ReactDOM from 'react-dom';
import Heatmap from 'heatmapjs/build/heatmap.js';

export default class ReactHeatmap extends React.Component {

    static defaultProps = {
        min: 0,
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

        this.setData(this.props.data);
    }

    componentDidUpdate(prevProps, prevState) {
        this.setData(this.props.data);
        this.setConfig(this.props.configObject);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.data.length !== nextProps.data.length || this.props.configObject.blur !== nextProps.configObject.blur;
    }

    setData(data) {
        if (data.length > 0) {
            this.heatmap.setData({
                max: this.computeMax(data),
                data: this.transformData(data)
            });
        }
    }

    setConfig(configObject) {
        this.heatmap.configure(configObject)
    }

    computeMax(data) {
        let maxValue = Math.max(...data.map(v => parseInt(v.value, 10)));
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
