import { notification } from 'antd';

export default (notice, status, duration) => {
    if (!notice&&!status) {
        return;
    }
    notification[status]({
        message: notice.msg ? notice.msg : notice,
        description: notice.desc ? notice.desc : null,
        duration: duration ? duration : 2,
    });
}

