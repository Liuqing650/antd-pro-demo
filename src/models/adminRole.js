import {
    getAdminRoleList
} from '../services/admin';
import notice from "../utils/notice";

export default {
    namespace: 'adminRole',

    state: {
        adminRoleData: [],
        roleLoading: false,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/admin/adminRoleController') {
                    dispatch({
                        type: 'queryAdminRoleList',
                        payload: {
                            index:1,
                            size:10
                        },
                    })
                }
            });
        },
    },

    effects: {
        *queryAdminRoleList({ payload }, { call, put }) {
            yield put({ type: 'changeAdminRoleState', payload: { roleLoading: true}})
            const data = yield call(getAdminRoleList, payload);
            yield put({
                type: 'querySuccess',
                payload: { adminRoleData: data, roleLoading: false }
            })
        },
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        changeAdminRoleState(state, action) {
            return { ...state, ...action.payload };
        }
    },
}