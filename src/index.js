import dva from "dva";
import "@/assets/css/index.css";
import createLoading from "dva-loading";
import "antd/dist/antd.less";
import "@/assets/less/theme.less";
import { message } from "antd";
// 1. Initialize
export const app = dva({
  onError(e) {
    const msg = (e.response && e.response.data.msg) || e.message;
    message.error(msg);
  }
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
app.model(require("./models/user").default);

// 4. Router
app.router(require("./router/router").default);

// 5. Start
app.start("#root");
