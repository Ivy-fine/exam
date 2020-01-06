// 用户信息展示
import request from "../utils/request";

export function addUser(params) {
  console.log(params);
  return request.post("/user", params);
}

export function users() {
  // 用户数据
  return request.get("/user/user");
}

export function identity() {
  //身份数据
  return request.get("/user/identity");
}

export function api_authority() {
  // api接口权限
  return request.get("/user/api_authority");
}

export function identity_api_authority() {
  // 身份和api接口关系
  return request.get("/user/identity_api_authority_relation");
}

export function view_authority() {
  //视图接口权限
  return request.get("/user/view_authority");
}

export function identity_view_authority() {
  // 身份和视图权限关系
  return request.get("/user/identity_view_authority_relation");
}

export function add_view_authority(params) {
  //添加视图
  return request.get("/user/authorityView/edit", params);
}

export function setIdentityView(params) {
  //给身份添加视图权限
  return request.post("/user/setIdentityView", params);
}
