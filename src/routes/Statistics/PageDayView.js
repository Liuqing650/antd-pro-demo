import React from 'react';
import { connect } from 'dva';
 
@connect(state => ({
    statistics: state.statistics
}))
export default class PageDayView extends React.Component {

    render() {
        return (
            <div>
                页面访问
            </div>
        )
    }
}