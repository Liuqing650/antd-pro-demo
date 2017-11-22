import React, { PureComponent } from 'react';
import G2 from 'g2';
// import ReactEcharts from 'echarts-for-react';
// import { LineChart, Line } from 'recharts';
import equal from '../equal';
import styles from '../index.less';

class AreaLayer extends PureComponent {
    static defaultProps = {
        borderColor: '#1890FF',
        color: 'rgba(24, 144, 255, 0.2)',
    };

    componentDidMount() {
        this.renderChart(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        if (!equal(this.props, nextProps)) {
            this.renderChart(nextProps.data);
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    handleRef = (n) => {
        this.node = n;
    }

    renderChart(data) {
        const {
            height = 0, fit = true, colors, borderWidth = 2, line, xAxis, yAxis, animate = true, namesArr,
        } = this.props;
        
        const borderColors = this.props.borderColors || colors;
        const keys = [];
        if (!data) {
            return;
        } else if (data) {
            for(let key in data) {
                if(!key) {
                    return;
                }
                keys.push(key);
            }
        }

        // clean
        this.node.innerHTML = '';

        const chart = new G2.Chart({
            container: this.node,
            forceFit: fit,
            height: height + 54,
            animate,
            plotCfg: {
                margin: [36, 100, 30, 100],
            },
            legend: null,
        });

        if (!xAxis && !yAxis) {
            chart.axis(false);
        }

        if (xAxis) {
            chart.axis('hour', xAxis);
        } else {
            chart.axis('hour', false);
        }

        if (yAxis) {
            chart.axis('count', yAxis);
        } else {
            chart.axis('count', false);
        }

        const dataConfig = {
            'hour': {
                type: 'cat',
                ...xAxis,
            },
            'count': {
                min: 0,
                ...yAxis,
            },
        };

        chart.tooltip({
            title: null,
            crosshairs: false,
            map: {
                title: null,
                name: 'hour',
                value: 'count',
            },
        });

        keys.map((item,index)=>{
            const view = chart.createView();
            view.source(data[item]);
            view.area().position('hour*count').color(colors[index]).style({ fillOpacity: 0.8 });
        })

        if (line) {
            keys.map((item, index) => {
                const view2 = chart.createView();
                view2.source(data, dataConfig, namesArr);
                view2.line().position('hour*count').color(borderColors[index]).size(borderWidth);
                view2.tooltip(false);
            })
        }
        chart.render();

        this.chart = chart;
    }
    
    render() {
        const { height } = this.props;

        return (
            <div className={styles.miniChart} style={{ height }}>
                <div className={styles.chartContent}>
                    <div ref={this.handleRef} />
                </div>
            </div>
        );
    }
}

export default AreaLayer;
