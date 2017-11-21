import { stringify } from 'qs';
import request from '../utils/request';
import md5 from "md5";
import { config, request2 } from '../utils';
/**
 * ad登录接口
 */

export async function adLogin(params) {
    return request('/api/admin/login', {
        method: 'POST',
        body: params,
    });
}

/**
 * 管理员列表
 * adminList 接口数据
 */
 export async function getAdminList(params) {
     return request(`/api/admin?${stringify(params) }`)
 }
 // 查询用户信息
 export async function getUserInfo(params) {
     return request(`/api/admin/${params.userId}`)
 }
 // 获取角色列表
 export async function getRoleList(params) {
     return request('/api/admin/role/list')
 }
 
 // 添加用户信息
 export async function addUserInfo(params) {
     params.password = md5(params.password);
     return request2('/api/admin', {
         method: 'POST',
         body: params,
     });
 }

 // 编辑用户信息
 export async function updateUserInfo(params) {
     return request2(`/api/admin/${params.userId}`, {
         method: 'PUT',
         body: params.data,
     });
 }

 // 重置密码
 export async function resetAdminPw(params) {
     return request(`/api/admin/${params.userId}/resetting`, {
         method: 'POST',
         body: { password: md5('123456789') },
     });
 }

 // 改变用户状态
 export async function changeAdminStatus(params) {
     return request(`/api/admin/${params.userId}/account`, {
         method: 'POST',
         body: params.data,
     });
 }

 /**
  * 管理员权限组设置
  * adminRoleController 接口数据
  */
export async function getAdminRoleList(params) {
    return request(`/api/admin/role?${stringify(params)}`);
}

/**
 * 管理员操作记录
 * adminOperate 接口数据
 * 普通查询 | 条件查询 
 * params:{index:1,size:10} | {key:'',index:1,size=10}
 * reurn {}
*/
export async function getAdminOperate(params) {
    return request(`/api/admin/operation?${stringify(params)}`);
}

/**
 * 统计中心
 * statistics 接口数据
*/
// PV实时统计
export async function getPvOverview(params) {
    return request(`/api/admin/statistic/pageview/overview`);
}

//  params: clientSourceType = 'CHANNEL' | 'SC_ADMIN' | ''
export async function getPvHour(params) {
    return request(`/api/admin/statistic/pageview/tendency/hour?${stringify(params)}`);
}

/**
 * 个人中心
 * userCenter 接口数据
 */
export async function modifyAdminPwd(params) {
    return request2(`/api/admin/password`, {
        method: 'PUT',
        body: params,
    });
}