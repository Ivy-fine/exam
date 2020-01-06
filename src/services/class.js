import request from "../utils/request";
export function getGrade() {
  return request.get("/manger/grade");
}
export function getClass() {
  return request.get("/manger/room");
}
export function getStudent() {
  return request.get("/manger/student");
}
export function addClass(params) {
  return request.post("/manger/room", params);
}
export function delClass(params) {
  return request.delete("/manger/room/delete", params);
}
export function addGrade(params) {
  return request.post("/manger/grade", params);
}
export function delGrade(params) {
  return request.delete("/manger/grade/delete", params);
}
export function delStudent(params) {
  return request.delete("/manger/student/delete", params);
}
