import React from "react";
import { Layout } from "antd";
import styles from "./index.less";
import Navigator from "../../components/Navigator";
import RouterView from "@/router/routerView";
import AvatarHeader from "@/components/Header";
import Authority from "@/components/authority";
import routes from "@/router/routes";
import withRoute from "@/components/withRoute";

const { Sider, Content } = Layout;
function BaseLayout(props) {
  function handleClick({ item, key }) {
    props.history.push(key);
  }
  return (
    <Layout>
      <AvatarHeader />
      <Layout>
        <Sider className={styles.sider}>
          <Navigator handleClick={handleClick} list={routes[1].children} />
        </Sider>
        <Content className={styles.content}>
          <h2>{props.route.meta && props.route.meta.title}</h2>
          <RouterView routes={props.childRoutes} />
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRoute(Authority(BaseLayout));
