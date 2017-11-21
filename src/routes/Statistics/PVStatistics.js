import React from "react";
import { connect } from "dva";
import {
    AreaLayer,
} from '../../components/StatisticsChart';

@connect(state=>({
    statistics: state.statistics
}))
export default class PVStatistics extends React.Component {

    componentDidMount() {

    }


    render() {
        const { overviewData, pvHourData, pvLoading } = this.props.statistics;

        console.log(pvHourData)
        

        return (
            <div>
                <AreaLayer
                    color="#975FE4"
                    height={200}
                    xAxis="hour"
                    yAxis="count"
                    data={pvHourData.today}
                />
            </div>
        )
    }
} 