import {
  interviews_list,
  interview_type,
  condition_interviews
} from "@/services/interview";
export default {
  namespace: "interview",
  state: {
    interviewList: [],
    interviewType: []
  },

  subscriptions: {
    init({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.includes("/interview")) {
          dispatch({ type: "interviews_list" });
          dispatch({ type: "interview_type" });
        }
      });
    }
  },

  effects: {
    *interviews_list(action, { call, put }) {
      const res = yield call(interviews_list);
      yield put({ type: "save", payload: { interviewList: res.data } });
    },
    *interview_type(action, { call, put }) {
      const res = yield call(interview_type);
      yield put({ type: "save", payload: { interviewType: res.data } });
    },
    *condition_interviews({ payload }, { call, put }) {
      const res = yield call(condition_interviews, payload);
      yield put({ type: "save", payload: { interviewList: res.data } });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
