import {markingList} from "@/services/marking";
export default {
    namespace: "marking",
    state: {
        data:[],
        detail:[]
    },
    effects: {
      *marking_list(action, { call, put }) {// 用户数据
        const res = yield call(markingList);//call里边写的是services里边的方法
        yield put({ type: "save", payload: { data: res.exam } });
      },
    },

    reducers: {
      save(state, action) {
      return { ...state,...action.payload };
      },
    //   changeInd(state,action){
    //     return {...state,...action.payload}
    //   }
    },

    // subscriptions: {
    //   init({ dispatch, history }) {
    //     return history.listen(({ pathname }) => {
    //       if (pathname.includes("/user")) {
    //         dispatch({ type: "changeInded" });
    //       }
    //     });
    //   }
    // },
  };
