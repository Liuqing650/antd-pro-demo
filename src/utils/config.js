let debug = false;

let config = {
    logo:'https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg',
    name: '星象后台管理系统',
    host: 'http://www.admin.com'
};

if (debug) {
    config.host = 'http://localhost:8080';
}

export default config;