import { stringify } from 'qs';
import request from '../utils/request';
import { config } from '../utils';
/**
 * 星象后台管理接口接入
 */

export async function adLogin(params) {
    return request('/api/admin/login', {
        method: 'POST',
        body: params,
    });
}

/**
 * adminList 接口数据
 */
 export async function getAdminList(params) {
     return request(`/api/admin?${stringify(params) }`)
 }