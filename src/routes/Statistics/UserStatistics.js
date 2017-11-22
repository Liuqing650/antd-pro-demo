import React from 'react';
import { connect } from 'dva';

@connect(state => ({
    statistics: state.statistics
}))
export default class UserStatistics extends React.Component {

    render() {
        return (
            <div>
                用户访问统计
            </div>
        )
    }
}