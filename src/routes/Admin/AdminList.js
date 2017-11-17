import React from 'react';
import {connect} from 'dva';
import TableComponet from '../../components/TableComponent/table';
import styles from "./AdminListStyle.less";
// ant-design-pro样式
import 'ant-design-pro/dist/ant-design-pro.css';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';


@connect(state => ({
    admin: state.admin,
}))

export default class AdminList extends React.Component {
    
    state = {
        loading: true,
        name: 'antd-name',
        current: 1,
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'admin/queryAdminList',
            payload: {index:this.state.current,size:10}
        }).then(() => this.setState({ loading: false }));
    }

    // 表格数据处理
    onTableChange(pagination) {
        this.setState({ loading: true })
        this.props.dispatch({
            type: 'admin/queryAdminList',
            payload: {index:pagination.current,size:pagination.pageSize}
        }).then(() => this.setState({ loading: false,current: pagination.current}));
    }

    render() {
        const { adminListInfo } = this.props.admin;
        const { loading,current } = this.state;
        const pagination = {
            current:current,
            pageSize: adminListInfo.size,
            total: adminListInfo.totalElements
        };

        const columns = [{
            key:'email',
            dataIndex:'email',
            title:'账号'
        },{
            key:'name',
            dataIndex:'name',
            title:'操作人'
        },{
            key:'phone',
            dataIndex:'phone',
            title:'电话'
        },{
            key:'roleName',
            dataIndex:'roleName',
            title:'管理权限'
        },{
            key:'creator',
            dataIndex:'creator',
            title:'创建者'
        },{
            key:'createdTs',
            dataIndex:'createdTs',
            title:'创建时间'
        },{
            key:'status',
            dataIndex:'status',
            title:'状态',
            render:(text,record) => (
                record.status=='ACTIVE'?'开启':'关闭'
            )
        },{
            key:'y',
            dataIndex:'x',
            title:'操作',
            render:(text,record) => (
                <Ellipsis length={5}>测试不能操作5各自</Ellipsis>
            )
        }]

        return (
            <div className={styles.listWrapper}>
                <div>{this.state.name}</div>
                <TableComponet 
                    rowKey="id" 
                    loading={loading}
                    columns={columns} 
                    dataSource={adminListInfo.content}
                    pagination={pagination}
                    tableChange={this.onTableChange.bind(this)}
                />
            </div>
        )
    }
};