import * as React from "react";
import ReactDOM from 'react-dom';
import Heatmap from 'heatmapjs/build/heatmap.js';

export default class ReactHeatmap extends React.Component {

    static defaultProps = {
        min: 0,
        data: [],
        background: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAAPACAIAAADlvkMuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NzI2MjM5Q0U4QUIxMUUzODJBMDg3QTMyOERCNTNCNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDFDRTA1RUU5NDAxMUUzODJBMDg3QTMyOERCNTNCNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg3MjYyMzlBRThBQjExRTM4MkEwODdBMzI4REI1M0I3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg3MjYyMzlCRThBQjExRTM4MkEwODdBMzI4REI1M0I3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+rUtTygAAG15JREFUeNrs3QlvU2cWgOFc79u9zkIghLXz///SlNApEIjjxFkc7x6DmQi1yjSL7bs9D1VFKxR/+i5V9PYc7KB3dr4FAAAAWVdwBQAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAABLArAAAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAEMAAAAAggAEA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MAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAAASwKwAAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAAAAAhgAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAAAEMAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAAIAABgAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAABAAAMAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAAIIABAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAABDAAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAAIYAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAAAIYAAAABDAAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAAABDAAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAACAAAYAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAQAADAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAACCAAQAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAQwAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAACGAAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAQwAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAAACGAAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAgAAGAAAAAQwAAIAABgAAAAEMAAAAAhgAAAAEMAAAAAhgAAAAEMAAAAAggAEAAEAAAwAAkHv/FWAAaZqt5bSTDrUAAAAASUVORK5CYII=",
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
        return Math.max(...data.map(v => parseInt(v.value, 10)));
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
            <div ref={divElement => (this.divElement = divElement)} style={{float: 'left'}}>
                <img src={this.props.background} alt={"heatmap"}
                     style={{display: 'block', maxWidth: '100%'}}/>
            </div>
        );
    }
}
