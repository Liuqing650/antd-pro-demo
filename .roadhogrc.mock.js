import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /papi/currentUser': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dRFVcIqZOYPcSNrlJsqQ.png',
      userid: '00000001',
      notifyCount: 12,
    },
  },
  // GET POST 可省略
  'GET /papi/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /papi/project/notice': getNotice,
  'GET /papi/activities': getActivities,
  'GET /papi/rule': getRule,
  'POST /papi/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /papi/forms': (req, res) => {
    res.send({ message: 'Ok' });
  },
  'GET /papi/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /papi/fake_list': getFakeList,
  'GET /papi/fake_chart_data': getFakeChartData,
  'GET /papi/profile/basic': getProfileBasicData,
  'GET /papi/profile/advanced': getProfileAdvancedData,
  'POST /papi/login/account': (req, res) => {
    const { password, userName } = req.body;
    res.send({ status: password === '888888' && userName === 'admin' ? 'ok' : 'error', type: 'account' });
  },
  'POST /papi/login/mobile': (req, res) => {
    res.send({ status: 'ok', type: 'mobile' });
  },
  'POST /papi/register': (req, res) => {
    res.send({ status: 'ok' });
  },
  'GET /papi/notices': getNotices,
};

export default noProxy ? {} : delay(proxy, 1000);
