import { login, fetchUserInfo } from "@/services/user";
export default {
  namespace: "user",
  state: {
    token: localStorage.getItem("token"),
    info: {}
  },

  subscriptions: {
    init({ dispatch, history }) {
      dispatch({ type: "fetchUserInfo" });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      yield put({ type: "save", payload: { token: res.token } });
      localStorage.setItem("token", res.token);
      yield put({ type: "fetchUserInfo" });
    },
    *fetchUserInfo(action, { call, put, select }) {
      const token = yield select(state => state.user.token);
      if (token) {
        const res = yield call(fetchUserInfo);
        yield put({ type: "save", payload: { info: res.data } });
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
