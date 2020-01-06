import {
  questions_list,
  subject_type,
  exam_type,
  question_type,
  condition_questions,
  question_type_add,
  question_type_del
} from "@/services/question";
export default {
  namespace: "question",
  state: {
    questionList: [],
    subjectType: [],
    examType: [],
    questionType: [],
    checked_all_subject: false
  },

  subscriptions: {
    init({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        dispatch({ type: "subject_type" });
        dispatch({ type: "exam_type" });
        dispatch({ type: "question_type" });
        if (pathname === "/question/list") {
          dispatch({ type: "questions_list" });
        }
      });
    }
  },

  effects: {
    *questions_list(action, { call, put }) {
      const res = yield call(questions_list);
      yield put({ type: "save", payload: { questionList: res.data } });
    },
    *subject_type(action, { call, put }) {
      const res = yield call(subject_type);
      const subjectType = res.data;
      subjectType.forEach(item => {
        item.checked = false;
      });
      yield put({ type: "save", payload: { subjectType } });
    },
    *exam_type(action, { call, put }) {
      const res = yield call(exam_type);
      yield put({ type: "save", payload: { examType: res.data } });
    },
    *question_type(action, { call, put }) {
      const res = yield call(question_type);
      yield put({ type: "save", payload: { questionType: res.data } });
    },
    *condition_questions({ payload }, { call, put }) {
      const res = yield call(condition_questions, payload);
      yield put({ type: "save", payload: { questionList: res.data } });
    },
    *question_type_add({ payload }, { call, put }) {
      yield call(question_type_add, payload);
      yield put({ type: "question_type" });
    },
    *question_type_del({ payload }, { call, put }) {
      yield call(question_type_del, payload);
      yield put({ type: "question_type" });
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    checkedSubject(state, action) {
      const subjectType = state.subjectType;
      subjectType.forEach(item => {
        if (item.subject_id === action.payload.subject_id) {
          item.checked = action.payload.checked;
        } else {
          item.checked = false;
        }
      });
      return { ...state, subjectType: [...subjectType] };
    },
    checkedAllSubject(state, action) {
      const subjectType = state.subjectType;
      subjectType.forEach(item => {
        item.checked = action.payload.checked;
      });
      return { ...state, subjectType: [...subjectType] };
    }
  }
};
