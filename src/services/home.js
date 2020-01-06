import request from "../utils/request";
export function getReport(params) {
  return request.get("/home/search/report", params);
}
export function getQuestionsReport(params) {
  return request.get("/home/questions/report", params);
}
export function getSubjectReport(params) {
  return request.get("/home/subject/report", params);
}
