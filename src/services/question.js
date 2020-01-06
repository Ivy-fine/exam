import request from "../utils/request";
export function questions_list() {
  //试题列表
  return request.get("/exam/questions/new");
}
export function subject_type() {
  //课程类型
  return request.get("/exam/subject");
}
export function exam_type() {
  //考试类型
  return request.get("/exam/examType");
}
export function question_type() {
  //试题类型
  return request.get("/exam/getQuestionsType");
}
export const condition_questions = (
  params //按条件查询试题列表
) => request.get("/exam/questions/condition", params);
export const question_add = params => {
  //新增试题
  return request.post("/exam/questions", params);
};
export const question_update = params => {
  //修改试题
  return request.put("/exam/questions/update", params);
};
export const question_type_add = params => {
  //新增试题类型
  return request.get("/exam/insertQuestionsType", params);
};
export const question_type_del = params => {
  return request.post("/exam/delQuestionsType", params);
};
