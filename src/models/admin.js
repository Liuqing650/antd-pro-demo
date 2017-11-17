import { getAdminList } from '../services/admin';

export default {
    namespace: 'admin',

    state: {
        adminListInfo: {},
    },

    effects: {
        *queryAdminList({ payload }, { call,put}) {
            const data = yield call(getAdminList, payload);
            // const data = [1,2.3,5];
            yield put({
                type:'querySuccess',
                payload: data
            })
        }
    },

    reducers: {
        querySuccess(state, action) {
            state.adminListInfo = action.payload;
            return {...state,};
        }
    },
}