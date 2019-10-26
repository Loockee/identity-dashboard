import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

function MyHeader(props) {
  const [taksList, setTaskList] = useState([]);

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Identity management</Menu.Item>
        <Menu.Item key="3" disabled>
          Chat
        </Menu.Item>
        <Menu.Item key="4" disabled>
          Compliance / Governance
        </Menu.Item>
      </Menu>
      <div>{taksList}</div>
    </Header>
  );
}

export function AppLayout(props) {
  const subscribe = props.onNewTaksEvent;
  const observable = {
    subscribe
  };
  return (
    <Layout className="layout">
      <MyHeader onNewTask={observable} />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Identity management</Breadcrumb.Item>
        </Breadcrumb>
        {props.nodeContent}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        DigitaLean ©2019 Inspired by Antd
      </Footer>
    </Layout>
  );
}
