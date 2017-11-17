import { routerRedux } from 'dva/router';
import md5 from "md5";
import { fakeAccountLogin, fakeMobileLogin } from '../services/api';
import { adLogin } from '../services/admin';
import notice from "../utils/notice";

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *accountSubmit({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      let loginInfo = {};
      loginInfo.email = payload.userName;
      loginInfo.password = md5(payload.password);
      // const response = yield call(fakeAccountLogin, payload);
      const data = yield call(adLogin, loginInfo);
      if (data && data.id) {
        sessionStorage.setItem('adminInfo', JSON.stringify(data));
        notice({msg:'登录成功',desc:'欢迎回来'}, 'success')
        let response = { "status": "ok", "type": "account" };
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
      }
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *mobileSubmit(_, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(fakeMobileLogin);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      yield put({
        type: 'changeSubmitting',
        payload: false,
      });
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      yield put(routerRedux.push('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    changeSubmitting(state, { payload }) {
      return {
        ...state,
        submitting: payload,
      };
    },
  },
};
