import React, { useState, useEffect } from "react";
import uuid from "uuid";

import {
  Form,
  Card,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Table,
  Divider,
  Tag,
  Drawer,
  Button,
  AutoComplete
} from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

export function IdentityListing(props) {
  const onSelect = e => {
    console.log(e);
  };

  // Coulmns should be discoverred on the fly
  // Question open: How to create specific render without too much code injection
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      render: text => <a>{text}</a>
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
      render: text => <a>{text}</a>
    },
    {
      title: "Passport Id",
      dataIndex: "passportId",
      key: "passportId"
    },
    {
      title: "Avs",
      dataIndex: "avs",
      key: "avs"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: a =>
        `${a.streetNumber} ${a.street}, ${a.zip} ${a.city} (${a.state}) ${
          a.country
        }`
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    }
  ];

  // key on data should be generated using a function, process data through a function
  // to create data to effectively load in the table.

  const { identityList } = props;

  return (
    <Table columns={columns} onRowClick={onSelect} dataSource={identityList} />
  );
}
