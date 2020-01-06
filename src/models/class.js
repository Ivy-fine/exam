import {
  getGrade,
  getClass,
  getStudent,
  addClass,
  delClass,
  addGrade,
  delGrade,
  delStudent
} from "@/services/class";
import { subject_type } from "@/services/question";
export default {
  namespace: "class",

  state: {
    grade: [],
    classroom: [],
    students: [],
    subjectType: []
  },
  subscriptions: {
    init({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname.includes("/grade")) {
          dispatch({ type: "fetchGrade" });
          dispatch({ type: "fetchClass" });
          dispatch({ type: "fetchStudent" });
          dispatch({ type: "fetchSubject" });
        }
      });
    }
  },
  effects: {
    *fetchGrade({ payload }, { call, put }) {
      const res = yield call(getGrade);
      yield put({ type: "save", payload: { grade: res.data } });
    },
    *fetchClass({ payload }, { call, put }) {
      const res = yield call(getClass);
      yield put({ type: "save", payload: { classroom: res.data } });
    },
    *fetchStudent({ payload }, { call, put }) {
      const res = yield call(getStudent);
      yield put({ type: "save", payload: { students: res.data } });
    },
    *fetchSubject({ payload }, { call, put }) {
      const res = yield call(subject_type);
      const subjectType = res.data;
      yield put({ type: "save", payload: { subjectType } });
    },
    *addClass({ payload }, { call, put }) {
      yield call(addClass, payload);
      yield put({ type: "fetchClass" });
    },
    *delClass({ payload }, { call, put }) {
      yield call(delClass, payload);
      yield put({ type: "fetchClass" });
    },
    *addGrade({ payload }, { call, put }) {
      yield call(addGrade, payload);
      yield put({ type: "fetchGrade" });
    },
    *delGrade({ payload }, { call, put }) {
      yield call(delGrade, payload);
      yield put({ type: "fetchGrade" });
    },
    *delStudent({ payload }, { call, put }) {
      yield call(delStudent, payload);
      yield put({ type: this.fetchStudent });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
