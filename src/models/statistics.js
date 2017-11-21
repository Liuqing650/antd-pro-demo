import {
    getPvOverview, getPvHour
} from '../services/admin';
import notice from "../utils/notice";

export default {
    namespace: 'statistics',

    state: {
        overviewData: {},
        pvHourData: {},
        pvLoading: false,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/statistics/pv') {
                    dispatch({
                        type: 'queryPVdata',
                        payload: {
                            clientSourceType: '',
                        },
                    })
                }
            });
        },
    },

    effects: {
        *queryPVdata({ payload }, { call, put }) {
            yield put({ type: 'changeState', payload: { pvLoading: true } })
            const overviewData = yield call(getPvOverview);
            const hourData = yield call(getPvHour, payload);
            if (overviewData && hourData) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        overviewData: overviewData,
                        pvHourData: hourData,
                        pvLoading: false
                    }
                })
            }
        },
        *queryHourdata({ payload }, { call, put }) {
            yield put({ type: 'changeState', payload: { pvLoading: true } })
            const hourData = yield call(getPvHour, payload);
            yield put({
                type: 'querySuccess',
                payload: { 
                    pvHourData: hourData, 
                    pvLoading: false 
                }
            })
        },
    },

    reducers: {
        querySuccess(state, action) {
            return { ...state, ...action.payload };
        },
        changeState(state, action) {
            return { ...state, ...action.payload };
        }
    },
}