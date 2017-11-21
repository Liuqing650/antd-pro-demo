import React from "react";
import { connect } from "dva";
import {
    AreaLayer,
} from '../../components/Charts';

@connect(state=>({
    statistics: state.statistics
}))
export default class PVStatistics extends React.Component {

    componentDidMount() {

    }


    render() {
        const { overviewData, pvHourData, pvLoading } = this.props.statistics;

        console.log("overviewData========>", overviewData);
        console.log("pvHourData========>", pvHourData);

        return (
            <div>
                454
              <AreaLayer
                color="#975FE4"
                height={46}
                data={pvHourData.today}
              />
                PVStatistics
            </div>
        )
    }
} 