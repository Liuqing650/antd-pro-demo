import { stringify } from 'qs';
import request from '../utils/request';
import { config } from '../utils';

export async function queryProjectNotice() {
  return request('/papi/project/notice');
}

export async function queryActivities() {
  return request('/papi/activities');
}

export async function queryRule(params) {
  return request(`/papi/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/papi/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/papi/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/papi/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/papi/fake_chart_data');
}

export async function queryTags() {
  return request('/papi/tags');
}

export async function queryBasicProfile() {
  return request('/papi/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/papi/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/papi/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/papi/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeMobileLogin(params) {
  return request('/papi/login/mobile', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/papi/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/papi/notices');
}
