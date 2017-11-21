import { 
    getAdminList, getUserInfo, getRoleList,
    addUserInfo, updateUserInfo, resetAdminPw, changeAdminStatus
} from '../services/admin';
import notice from "../utils/notice";

export default {
    namespace: 'admin',

    state: {
        adminListInfo: {},
        userInfo:{},
        roleList:[],
    },

    effects: {
        *queryAdminList({ payload }, { call,put}) {
            const data = yield call(getAdminList, payload);
            yield put({
                type:'querySuccess',
                payload: { adminListInfo: data}
            })
        },
        *queryRoleList({ payload },{call,put}) {
            const data = yield call(getRoleList);
            yield put({
                type: 'querySuccess',
                payload: { roleList: data}
            })
        },
        *queryUserInfo({ payload }, { call, put }) {
            const userInfo = yield call(getUserInfo, payload);
            const roleList = yield call(getRoleList);
            userInfo.userId = payload.userId;
            yield put({
                type: 'querySuccess',
                payload: { userInfo: userInfo, roleList: roleList}
            })
        },
        *addUserInfo({ payload }, { call, put }) {
            console.log("添加角色:", payload);
            const data = yield call(addUserInfo, payload);
            console.log("添加角色成功:", data);
            if(data) {
                yield put({ type: 'queryAdminList' });
            }
        },
        *updateUserInfo({ payload }, { call, put }) {
            yield call(updateUserInfo , payload);
            yield put({ type:'queryAdminList'});
            console.log("修改角色成功:", payload);
        },
        *resetPassword({payload},{call,put}) {
            console.log('resetPassword',payload);
            yield call(resetAdminPw, payload);
            notice({ msg: '密码重置成功', desc: '新密码为：123456789' }, 'success')
        },
        *changeAccount({ payload }, { call, put }) {
            console.log('changeAccount', payload);
            yield call(changeAdminStatus, payload);
            yield put({ type: 'queryAdminList' });
        }
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        initAdminState(state,action) {
            return {...state, ...action.payload};
        }
    },
}