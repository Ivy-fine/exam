import dynamic from "dva/dynamic";
import { app } from "@/index.js";
export default (models = [], component) => {
  return dynamic({
    app,
    models: () => models.map(item => import(`@/models/${item}`)),
    component
  });
};
