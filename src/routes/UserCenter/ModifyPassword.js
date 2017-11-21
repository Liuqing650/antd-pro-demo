import React from 'react';
import { connect } from "dva";
import md5 from "md5";
import { Form, Input, Button, Row, Col, Icon } from 'antd';

const FormItem = Form.Item;

@connect(state=>{
    userCenter: state.userCenter
})

@Form.create()
export default class ModifyPassword extends React.Component {

    state = {
        loading: false,
    }

    onHandleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.changeLoading(true);
                console.log("密码参数=====>",values);
                const payload = {};
                payload.newPassword = md5(values.newPassword);
                payload.oldPassword = md5(values.oldPassword)
                this.props.dispatch({
                    type: 'userCenter/modifyAdminPwd',
                    payload: payload
                }).then(()=>{this.changeLoading(false)});
            }
        });
    }

    changeLoading = (loading) => {
        this.setState({
            loading:loading
        })
    }

    // 表单验证
    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('newPassword')) {
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

    onResetForm = () => {
        const { form } = this.props;
        form.resetFields(); // 重置表单状态
    }



    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { loading } = this.state;

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

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        return (
            <div>
                <Form
                    onSubmit={this.onHandleOk}
                    style={{ marginTop: 8 }}
                >
                    <FormItem
                        {...formItemLayout}
                        label="原密码"
                    >
                        {getFieldDecorator('oldPassword', {
                            rules: [{
                                required: true, message: '原来的密码不能为空！',
                            }],
                        })(
                            <Input
                                type="password"
                                placeholder="请输入密码" />
                            )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('newPassword', {
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
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            提交
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.onResetForm}>重置</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}