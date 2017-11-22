import React from "react";
import { connect } from 'dva';
import { Form, Input, Select, Button, Row, Col, Menu, Dropdown, Icon } from 'antd';
import { TableComponent, } from '../../components/common';
import commonStyles from "./CommonStyle.less";
import styles from "./AdminRoleStyle.less";

@connect(state => ({
    adminRole: state.adminRole,
}))
export default class AdminRole extends React.Component {

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
            type: 'adminRole/queryAdminRoleList',
            payload: { index: pagination.current, size: pagination.pageSize }
        }).then(() => this.setState({ current: pagination.current }));
    }

    render() {
        const { adminRoleData, roleLoading } = this.props.adminRole;
        const { loading,  current,  } = this.state;
        const pagination = {
            current: current,
            pageSize: adminRoleData.size,
            total: adminRoleData.totalElements
        };
        const columns = [{
                key: 'name',
                dataIndex: 'name',
                title: '权限组名称'
            }, {
                key: 'roleType',
                dataIndex: 'roleType',
                title: '权限类型'
            }, {
                key: 'createdTs',
                dataIndex: 'createdTs',
                title: '创建时间'
            }, {
                key: 'lastModifiedTs',
                dataIndex: 'lastModifiedTs',
                title: '最后修改时间'
            }, {
                key: 'creator',
                dataIndex: 'creator',
                title: '创建人'
            }, {
                key: 'updater',
                dataIndex: 'updater',
                title: '修改人'
            }, {
                key: 'active',
                dataIndex: 'active',
                title: '操作',
                render: (text, record) => (
                    <span>
                        <a>编辑</a>
                    </span>
                )
            }
        ]
        return (
            <div className={commonStyles.listWrapper}>
                <Row className={commonStyles.toolLineStyle}>
                    <Button type="primary" >添加权限</Button>
                </Row>
                <TableComponent
                    rowKey={record => record.id}
                    loading={roleLoading}
                    columns={columns}
                    dataSource={adminRoleData.content}
                    pagination={pagination}
                    tableChange={this.onTableChange}
                />
            </div>
        )
    }
}
  AdminRole;