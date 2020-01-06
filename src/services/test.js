import request from "../utils/request";
export function test_list(params) {
  return request.get("/exam/exam", params);
}
export const test_add = params => {
  return request.post("/exam/exam", params);
};
// export const test_update = params => {
//   return request.put("/exam/test/update", params);
// };
export const test_detail = id => {
  return request.get(`/exam/exam/${id}`);
};
