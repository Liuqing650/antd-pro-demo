import React from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Icon, Spin } from 'antd';


const ModalComponent = ({
    tip,
    title,
    width,
    loading,
    isForm,
    maskClosable,
    modalType,
    visible,
    handleOk,
    modalContent,    
    handleCancel,
}) => {

    return (
        <Modal
            title={title}
            width={width}
            maskClosable={maskClosable}
            visible={ visible }
            onOk={handleOk}
            onCancel={handleCancel}
            footer={
                isForm ? [
                <Button key="back"  onClick={handleCancel}>取消</Button>,
                <Button key="submit" disabled={loading} type="primary"  onClick={handleOk}>
                    提交
                    </Button>,
                ] : [
                    <Button key="back" onClick={handleCancel}>取消</Button>,
                    <Button key="submit" disabled={loading} type="primary" htmlType="submit" >
                        确定
                    </Button>,
                ]
            }
        >
            <Spin spinning={loading} tip={tip}>
                {modalContent}
            </Spin>
        </Modal>
    )
}

ModalComponent.defaultProps = {
    title: '模态窗口',
    width: 500,
    modalContent: <p>将节点传递到modalContent中</p>,
    visible: false,
    maskClosable: true,
};

ModalComponent.propTypes = {
    title: PropTypes.string,
    width: PropTypes.number,
    visible: PropTypes.bool,
    maskClosable: PropTypes.bool,
    modalContent: PropTypes.object,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
};

export default ModalComponent;