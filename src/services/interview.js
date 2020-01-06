import request from "../utils/request";
export function interviews_list() {
  return request.get("/exam/interviews/new");
}

export function question_type() {
  return request.get("/exam/getInterviewsType");
}

export const condition_interviews = params =>
  request.get("/exam/interviews/condition", params);

export const interview_add = params => {
  return request.post("/exam/interviews", params);
};

export const interview_update = params => {
  return request.post("/exam/interviews/update", params);
};
