import request from '../utils/request';

export async function query() {
  return request('/papi/users');
}

export async function queryCurrent() {
  return request('/papi/currentUser');
}
