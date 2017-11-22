import React from "react";
import { connect } from "dva";
import { Select, Row, Col, Spin } from "antd";
import { AreaEchart} from '../../components/StatisticsChart';
import styles from "./StatisticsStyle.less";

const Option = Select.Option;

@connect(state=>({
    statistics: state.statistics
}))
export default class PVStatistics extends React.Component {

    state = {
        options: [{ name: '全部用户', value: '' }, { name: '渠道用户', value: 'CHANNEL' }, { name: '扩展用户', value: 'SC_ADMIN'}],
    }

    handleChange = (value) => {
        this.props.dispatch({
            type: 'statistics/queryPVdata',
            payload: {
                clientSourceType: value,
            },
        })
    }

    render() {
        const { overviewData, pvHourData, pvLoading } = this.props.statistics;
        const { options } = this.state;

        const AreaEchartProps = {
            data: pvHourData,
            series: { type: 'line' },
            names: { recentDaysAvg: "过去七天平均访问量", today: "今日访问量", yesterday: "昨日访问量"},
            legend: ["过去七天平均访问量", "今日访问量", "昨日访问量"]
        }

        const optionNode = options.map((item)=>{
            return (
                <Option key={item.value} value={item.value}>{item.name}</Option>
            )
        });

        return (
            <div>
                <Row className={styles.selectStyle}>
                    <Col span="2" className={styles.selectTitleStyle}>统计用户</Col>
                    <Col span="6">
                        <Select
                            defaultValue=""
                            onChange={this.handleChange}
                            style={{ width: 200 }}
                        >
                            {optionNode}
                        </Select>
                    </Col>
                </Row>
                <Spin tip="加载中..." spinning={pvLoading}>
                    <AreaEchart { ...AreaEchartProps } />
                </Spin>
            </div>
        )
    }
} 