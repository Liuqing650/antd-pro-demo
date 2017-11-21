import React from "react";
import { connect } from 'dva';
import { Form, Input, Select, Button, Row, Col, Menu, Dropdown, Icon } from 'antd';
import TableComponent from '../../components/TableComponent/index';
import commonStyles from "./CommonStyle.less";
import styles from "./AdminRoleStyle.less";

const Search = Input.Search;
@connect(state => ({
    adminOperate: state.adminOperate,
}))
export default class AdminHandleRecord extends React.Component {

    state = {
        loading: true,
        modalLoading: false,
        modalVisible: false,
        modalType: 'update',
        current: 1,
    }


    // 表格数据处理
    onTableChange = (pagination) => {
        this.props.dispatch({
            type: 'adminOperate/queryAdminRoleOperate',
            payload: { index: pagination.current, size: pagination.pageSize }
        }).then(() => this.setState({ current: pagination.current }));
    }

    // 条件搜索
    onSearchOperate = (searchVal) => {
        let obj = {};
        obj.index = 1;
        obj.size = 10;
        obj.key = searchVal;
        this.props.dispatch({
            type: 'adminOperate/queryAdminRoleOperate',
            payload: obj
        }).then(() => this.setState({ current: obj.index }));
    }

    render() {
        const { adminOperateData, opLoading } = this.props.adminOperate;
        const { loading, current, } = this.state;
        const pagination = {
            current: current,
            pageSize: adminOperateData.size,
            total: adminOperateData.totalElements
        };

        const columns = [{
            key: 'email',
            dataIndex: 'email',
            title: '账号'
        }, {
            key: 'username',
            dataIndex: 'username',
            title: '操作人'
        }, {
            key: 'createdDate',
            dataIndex: 'createdDate',
            title: '操作时间'
        }, {
            key: 'desc',
            dataIndex: 'desc',
            title: '操作内容'
        }
        ]
        return (
            <div className={commonStyles.listWrapper}>
                <Row className={commonStyles.toolLineStyle} type="flex" justify="end">
                    <Search
                        placeholder="请输入操作人或者账号"
                        style={{ width: 260 }}
                        onSearch={value=> this.onSearchOperate(value)}
                    />
                </Row>
                <TableComponent
                    rowKey={record => record.id}
                    loading={opLoading}
                    columns={columns}
                    dataSource={adminOperateData.content}
                    pagination={pagination}
                    tableChange={this.onTableChange}
                />
            </div>
        )
    }
}