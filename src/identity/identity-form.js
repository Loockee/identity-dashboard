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
  AutoComplete,
  DatePicker,
  Radio
} from "antd";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

export function IdentityForm(props) {
  const [state, updateState] = useState({
    confirmDirty: false,
    autoCompleteResult: []
  });

  const { onSubmit, onCancel } = props;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        onSubmit(values);
      }
    });
  };

  const handleCancel = e => {
    onCancel(e);
  };

  const { getFieldDecorator } = props.form;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  // TODO: implement the birthdate selection
  // TODO: add the rule for the gender selection
  return (
    <div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Gender">
          <Radio.Group onChange={() => {}}>
            <Radio.Button value="default">Femal</Radio.Button>
            <Radio.Button value="large">Male</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("firstname", {
            rules: [{ required: true, message: "Please input your firstname!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Firstname"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("lastname", {
            rules: [{ required: true, message: "Please input your lastname!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Lastname"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("birthdate", {
            rules: [{ required: true, message: "Please input your Birthdate!" }]
          })(
            <DatePicker
              name="birthdate"
              placeholder="Select your birthdate"
              onChange={() => {}}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your phone number!" }
            ]
          })(
            <Input
              prefix={
                <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Phone number"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("avs", {
            rules: [
              { required: true, message: "Please input your avs number!" }
            ]
          })(
            <Input
              prefix={
                <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Avs number"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("passportId", {
            rules: [
              { required: true, message: "Please input your passport id!" }
            ]
          })(
            <Input
              prefix={
                <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Passport number"
            />
          )}
        </Form.Item>
        <Divider />
        <h3>Address</h3>
        <Form.Item>
          {getFieldDecorator("streetNumber", {
            rules: []
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Street Number"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("street", {
            rules: [
              {
                required: true,
                message: "Please input the name of your street"
              }
            ]
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Passport number"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("zip", {
            rules: [{ required: true, message: "Please input your zipCode!" }]
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Zip code"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("city", {
            rules: [
              { required: true, message: "Please input the name of your city" }
            ]
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="City name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("state", {
            rules: []
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="State name"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("country", {
            rules: [
              {
                required: true,
                message: "Please input the name of your country"
              }
            ]
          })(
            <Input
              prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Country name"
            />
          )}
        </Form.Item>
        <Divider />
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export const WrappedIdentityForm = Form.create({ name: "upd-identity" })(
  IdentityForm
);
