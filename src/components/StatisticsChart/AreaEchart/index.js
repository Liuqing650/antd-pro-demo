import React from 'react';
import ReactEcharts from 'echarts-for-react';


const colors = ['#5793f3', '#d14a61', '#675bba'];
const xAxisData = [];

const AreaEchart = ({
    data,
    series,
    names,
    legend,
}) => {

    /**
     * 
     * @param {多数据源} data
     * @param {多数据源配置} name
     * @param {多数据源名称:{key:title}} type
     */
    const separateData = (data, name , type) => {
        let result = [];
        if(!data) {
            return
        }
        data.map((item, index) => {
            if (type == 'time') {
                let hour = item[name].toString();
                if (hour.length==1) {
                    hour = '0'+hour;
                }
                hour = hour+':00'
                result.push(hour)
            } else {
                result.push(item[name])
            }
        })
        return result;
    }
    
    // const areaData = handleSeries(data, series, names);

    // console.log("areaData========>",areaData)

    const option = {
        title: {
            text: '实时变化趋势',
            left: 'left'
        },
        color: ['#9acd32', '#20a0ff','#f7ba2a'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: legend
        },
        xAxis: {
            type: 'category',
            name: '时间',
            data: separateData(data.recentDaysAvg, 'hour', 'time')
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis: {
            type: 'value',
            name: '访问量',
            max: 120
        },
        series: [
            {
                name: '过去七天平均访问量',
                type: 'line',
                areaStyle: { normal: {} },
                data: separateData(data.recentDaysAvg,'count')
            },
            {
                name: '今日访问量',
                type: 'line',
                areaStyle: { normal: {} },
                data: separateData(data.today, 'count')
            },
            {
                name: '昨日访问量',
                type: 'line',
                areaStyle: { normal: {} },
                data: separateData(data.yesterday, 'count')
            }]
    };


    return (
        <div>
            <ReactEcharts
                option={option}
                style={{ height: '350px', width: '100%' }}
                className='react_for_echarts' /> 
        </div>
    )
}

export default AreaEchart;