import { Icon } from "antd";

let debug = false;
let config = {
    logo:'https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg',
    name: '星象后台管理系统',
    host: 'http://www.admin.com',
    footer: <span>Copyright <Icon type="copyright" /> 2017 誉存大数据科技有限公司</span>
};

if (debug) {
    config.host = 'http://localhost:8080';
}

export default config;