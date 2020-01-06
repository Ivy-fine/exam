import request from "../utils/request";
export function markingList() {
  return request.get("/exam/student");
}
