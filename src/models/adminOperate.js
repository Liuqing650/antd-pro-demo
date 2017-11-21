import {
    getAdminOperate
} from '../services/admin';
import notice from "../utils/notice";

export default {
    namespace: 'adminOperate',

    state: {
        adminOperateData: {},
        opLoading: false,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/admin/adminHandleRecord') {
                    dispatch({
                        type: 'queryAdminRoleOperate',
                        payload: {
                            index: 1,
                            size: 10
                        },
                    })
                }
            });
        },
    },

    effects: {
        *queryAdminRoleOperate({ payload }, { call, put }) {
            yield put({ type: 'changeAdminOperateState', payload: { opLoading: true } })
            const data = yield call(getAdminOperate, payload);
            yield put({
                type: 'querySuccess',
                payload: { adminOperateData: data, opLoading: false }
            })
        },
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        changeAdminOperateState(state, action) {
            return { ...state, ...action.payload };
        }
    },
}