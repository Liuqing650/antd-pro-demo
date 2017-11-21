import React from 'react';
import {connect} from 'dva';
import { Form, Input, Select, Button,Row,Col,Menu,Dropdown,Icon } from 'antd';
import TableComponent from '../../components/TableComponent/index';
import ModalComponent from '../../components/ModalComponent/index';
import styles from "./AdminListStyle.less";
import commonStyles from "./CommonStyle.less";
// ant-design-pro样式
import 'ant-design-pro/dist/ant-design-pro.css';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const FormItem = Form.Item;
const { Option } = Select;

@connect(state => ({
    admin: state.admin,
}))

@Form.create()
export default class AdminList extends React.Component {
    
    state = {
        loading: true,
        modalLoading: false,
        modalVisible: false,
        modalType: 'update',
        current: 1,
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'admin/queryAdminList',
            payload: {index:this.state.current,size:10}
        }).then(() => this.setState({ loading: false }));
    }

    // 表格数据处理
    onTableChange = (pagination) => {
        this.setState({ loading: true })
        this.props.dispatch({
            type: 'admin/queryAdminList',
            payload: {index:pagination.current,size:pagination.pageSize}
        }).then(() => this.setState({ loading: false,current: pagination.current}));
    }

    // 表格操作（重置/编辑/关闭）
    onResetPassword(id) {
        console.log('重置密码',id);
        this.props.dispatch({
            type: 'admin/resetPassword',
            payload: {userId:id}
        })
    }

    onEditForm(id) {
        this.onChangeModal(true, 'update', true)
        this.props.dispatch({
            type: 'admin/queryUserInfo',
            payload: {userId:id}
        }).then(() => this.onChangeModalLoading(false));
    }

    onChangeAccount = (record) => {
        let payload = {};
        payload.userId = record.id;
        payload.data = { type: record.status == 'ACTIVE' ? 'DISABLE' :'ENABLE'}
        this.props.dispatch({
            type: 'admin/changeAccount',
            payload: payload
        })
    }

    // 添加/编辑管理员
    onChangeModal = (visible, type, loading) => {
        this.setState({
            modalType: type ? type : this.state.modalType,
            modalVisible: visible,
            modalLoading: loading,
        })
        if (visible) {
            const { form } = this.props;
            form.resetFields(); // 重置表单状态
            if (type === 'add') {
                this.props.dispatch({ // 清除表单数据
                    type: 'admin/initAdminState',
                    payload: { userInfo: {} }
                })
                this.props.dispatch({ // 获取角色数据
                    type: 'admin/queryRoleList',
                }).then(() => { this.onChangeModalLoading(false); });
            }
        }
    }

    // 表单验证
    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不匹配!');
        } else {
            callback();
        }
    }

    checkPassword = (rule, value, callback) => {
        if (value && value.length < 8) {
            callback('密码最短需要8位');
        } else {
            const { form } = this.props;
            if (value && this.state.confirmDirty) {
                form.validateFields(['confirm'], { force: true });
            }
            callback();
        }
    }

    checkPhone = (rule, value, callback) => {
        var reg = new RegExp("^[0-9]*$"); 
        if (value && !reg.test(value)) {
            callback("请输入正确的电话号码!");
        }  
        if (value && value.length < 6) {
            callback('电话号码最短需要6位');
        } else {
            callback();
        }
    }
    
    // 提交编辑数据
    onHandleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("提交类型",this.state.modalType)
                if (this.state.modalType == 'add') {// 新增 
                    const payload = {};
                    for(let key in values) {
                        if (key !='confirm') {
                            payload[key] = values[key];
                        }
                    }
                    this.props.dispatch({ 
                        type: 'admin/addUserInfo',
                        payload: payload
                    })
                } else if (this.state.modalType == 'update') {//编辑 
                    const { userInfo } = this.props.admin;
                    const payload = {};
                    payload.data = values;
                    payload.userId = userInfo.userId;
                    this.props.dispatch({ 
                        type: 'admin/updateUserInfo',
                        payload: payload
                    })
                }
                this.onChangeModal(false);
            }
        });
    }

    onHandleCancel = () => {
        this.onChangeModal(false);
    }

    onChangeModalLoading = (loading) => {
        this.setState({
            modalLoading: loading,
        })
    }

    render() {
        const { adminListInfo, userInfo, roleList } = this.props.admin;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { loading,modalLoading,current,modalVisible,modalType } = this.state;

        const pagination = {
            current:current,
            pageSize: adminListInfo.size,
            total: adminListInfo.totalElements
        };

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 17 },
                md: { span: 14 },
            },
        };


        const createMenu = (record) => {
            let menu = (
                <Menu>
                    <Menu.Item key="0">
                        <a onClick={()=>this.onResetPassword(record.id)}>重置密码</a>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <a onClick={()=>this.onEditForm(record.id)}>编辑资料</a>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <a onClick={() => this.onChangeAccount(record)}>{record.status == 'ACTIVE' ? '关闭账号' :'开启账号'}</a>
                    </Menu.Item>
                </Menu>
            )
            return (
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">
                        操作<Icon type="down" />
                    </a>
                </Dropdown>
            )
        }
        
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
            }, {
                key: 'active',
                dataIndex: 'active',
                title:'操作',
                render:(text,record) => (createMenu(record))
            }
        ]

        const options = (roleList) => {
            let result = [];
            roleList.map((item, index) => {
                result.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
            })
            return result;
        }
        
        const passwordForm = (modalType) => {
            if (modalType === 'add') {
                return (
                    <div>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '密码不能为空！',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="请输入密码" />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: '确认密码不能为空！',
                                }, {
                                    validator: this.checkConfirm,
                                }],
                            })(
                                <Input
                                    type="password"
                                    placeholder="请输入密码" />
                                )}
                        </FormItem>
                    </div>
                )
            }
        }

        const formComponent = (
            <Form
                onSubmit={this.onHandleOk}
                style={{ marginTop: 8 }}
            >
                <FormItem
                    {...formItemLayout}
                    label="操作人"
                >
                    {getFieldDecorator('name',{
                        rules: [{
                            required: true, message: '请输入操作人员不能为空！',
                        }],
                        initialValue: userInfo.name || null,
                    })(
                        <Input placeholder="请输入操作人员" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="账户"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, message: '账户邮箱地址不能为空！',
                        }, {
                            type: 'email', message: '邮箱地址格式错误！',
                        }],
                        initialValue: userInfo.email || null,
                    })(
                        <Input placeholder="xx@xx" />
                        )}
                </FormItem>
                {passwordForm(modalType)}
                <FormItem
                    {...formItemLayout}
                    label="电话号码"
                >
                    {getFieldDecorator('phone', {
                        rules: [{
                            required: true, message: '电话号码不能为空！',
                        }, {
                            validator: this.checkPhone,
                        }],
                        initialValue: userInfo.phone || null,
                    })(
                        <Input placeholder="请输入电话号码" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="应用权限组"
                >
                    {getFieldDecorator('roleId', {
                        rules: [{
                            required: true, message: '应用权限组不能为空！',
                        }],
                        initialValue: userInfo.roleId || null,
                    })(
                        <Select
                            placeholder="请选择权限组（必选）"
                        >
                            {options(roleList)}
                        </Select>
                        )}
                </FormItem>
            </Form>
        ) 

        const ModalComponentProps = {
            title: modalType==='add'?'添加管理员':'编辑管理员信息',
            tip: modalType === 'add' ? '权限数据加载中...' : '用户数据加载中...',
            isForm: true,
            maskClosable: false,
            loading: modalLoading,
            modalType: modalType,
            visible: modalVisible,
            handleOk: this.onHandleOk,
            handleCancel: this.onHandleCancel,
            modalContent: formComponent,
        };

        return (
            <div className={commonStyles.listWrapper}>
                <Row className={commonStyles.toolLineStyle}>
                    <Button type="primary" onClick={()=>this.onChangeModal(true,'add',true)}>添加管理员</Button>
                </Row>
                <TableComponent 
                    rowKey="id" 
                    loading={loading}
                    columns={columns} 
                    dataSource={adminListInfo.content}
                    pagination={pagination}
                    tableChange={this.onTableChange}
                />
                <ModalComponent { ...ModalComponentProps } />
            </div>
        )
    }
};