import request from "../utils/request";
export function login(params) {
  return request.post("/user/login", params);
}
export function fetchUserInfo() {
  return request.get("/user/userInfo");
}
export function fetchIdentityView(params) {
  return request.get("/user/new", params);
}
