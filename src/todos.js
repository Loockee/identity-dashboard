import React, { useState, useEffect } from "react";

import { Table, Progress } from "antd";

export function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState([false]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(json => setTodos(json))
      .then(() => setLoading(false));
  });

  /*
  {
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
   */
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: t => {
        if (t) {
          return (
            <Progress type="circle" percent={75} width={30} size="small" />
          );
        } else {
          return (
            <Progress type="circle" percent={100} width={30} size="small" />
          );
        }
      }
    }
  ];

  return (
    <div>
      <Table dataSource={todos} loading={loading} columns={columns} />
    </div>
  );
}
