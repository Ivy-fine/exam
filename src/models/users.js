import {
  addUser,
  users,
  identity,
  api_authority,
  identity_api_authority,
  view_authority,
  identity_view_authority
} from "@/services/users";

export default {
  namespace: "users",
  state: {
    data: [],
    ind: 0,
    identity: [],
    identityViewAuthority_list: [],
    viewAuthority_list: []
  },
  effects: {
    *users_list(action, { call, put }) {
      // 用户数据
      const res = yield call(users); //call里边写的是services里边的方法
      yield put({ type: "save", payload: { data: res.data } });
    },
    *identity_list(action, { call, put }) {
      // 身份数据
      const res = yield call(identity);
      yield put({
        type: "save",
        payload: { data: res.data, identity: res.data }
      });
    },
    *apiAuthority_list(action, { call, put }) {
      // api接口权限
      const res = yield call(api_authority);
      yield put({ type: "save", payload: { data: res.data } });
    },
    *identityApiAuthority_list(action, { call, put }) {
      //身份和api接口权限
      const res = yield call(identity_api_authority);
      yield put({ type: "save", payload: { data: res.data } });
    },
    *viewAuthority_list(action, { call, put }) {
      // 视图接口权限
      const res = yield call(view_authority);
      yield put({
        type: "save",
        payload: { data: res.data, viewAuthority_list: res.data }
      });
    },
    *identityViewAuthority_list(action, { call, put }) {
      // 身份和视图接口权限
      const res = yield call(identity_view_authority);
      yield put({
        type: "save",
        payload: { data: res.data, identityViewAuthority_list: res.data }
      });
    },
    *changeInded(action, { call, put }) {
      // 修改ind，并且根据ind获取表格的大标题
      yield put({ type: "changeInd", payload: { ind: action.id } });
    },
    *addUser_list(action, { call, put }) {
      // 添加用户
      const res = yield call(addUser, action.value);
      alert(res.mag);
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    changeInd(state, action) {
      return { ...state, ...action.payload };
    }
  },

  subscriptions: {
    init({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.includes("/user")) {
          dispatch({ type: "changeInded" });
          dispatch({ type: "identity_list" });
          dispatch({ type: "identityViewAuthority_list" });
          dispatch({ type: "viewAuthority_list" });
        }
      });
    }
  }
};
