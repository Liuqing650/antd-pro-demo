import {
    modifyAdminPwd
} from '../services/admin';
import notice from "../utils/notice";

export default {
    namespace: 'userCenter',

    state: {
    },

    effects: {
        *modifyAdminPwd({ payload }, { call, put }) {
            const data = yield call(modifyAdminPwd, payload);
            console.log("modifyAdminPwd===========>",data)
        },
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        }
    },
}