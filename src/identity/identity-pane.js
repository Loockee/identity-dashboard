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
  PageHeader,
  AutoComplete,
  Spin
} from "antd";

import { createRequest, sendRequest, sockPubSub } from "./functions";

import { IdentityListing } from "./identity-listing";
import { IdentityDrawer } from "./identity-drawer";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const createId = () => uuid.v4();
const createAddress = (streetNumber, street, zip, city, state, country) => ({
  streetNumber,
  street,
  zip,
  city,
  state,
  country
});

const createIdentity = (
  firstname,
  lastname,
  cardId,
  passportId,
  avs,
  phone,
  email,
  streetNumber,
  street,
  zip,
  city,
  state,
  country
) => {
  // validation and object creation are a synchronous process
  const id = createId();
  const address = createAddress(
    streetNumber,
    street,
    zip,
    city,
    state,
    country
  );
  const identity = {
    id,
    firstname,
    lastname,
    cardId,
    passportId,
    avs,
    phone,
    email,
    address
  };

  // start effective creation process
  /**
   * Flow:
   *  0. mark the form as dirty
   *  1. send an information to the UI to notify about the active process
   *  2. send the command to the backend
   *  3. receive the response
   *  4. extract the process id from the response
   *  5. subscrbie to the webscoket to listen for message that regards the task
   *  6. complete the process an release the UI (undirty).
   */
  return new Promise(async (resolve, reject) => {
    const request = createRequest("post", "/identity", identity);
    console.log(request);
    try {
      const response = await sendRequest(request);
      const { trackingId } = response;
    } catch (e) {
      // TODO: send notification to the dashboard
    }
  });
};

const d = [
  {
    key: "1",
    id: "0D2B748F-65A8-4442-8A49-3CD21628DC2E",
    firstname: "John",
    lastname: "Brown",
    passportId: "12430987235",
    avs: "23094rf4",
    address: {
      streetNumber: "77",
      street: "Liskov avenue",
      city: "Montreal",
      country: "Canada",
      state: "Quebec",
      zip: "h1wm3j"
    },
    phone: "+559685465785",
    email: "jbrown@mycorp.ca"
  }
];

export function IdentityPane(props) {
  const [state, setState] = useState({
    currentIdentity: {}, // indicate the identity under edition
    loading: false, // indicates if there is any active process
    visible: false, // indicates if the drawer is visible
    identityList: [], // list of identities to present on the screen
    taskList: [] // list of active process
  });

  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

  const onCompleteLoading = () => {
    setState({ ...state, currentIdentity: {}, loading: false });
  };

  const addIdentity = (
    {
      firstname,
      lastname,
      cardId,
      passportId,
      avs,
      phone,
      email,
      streetNumber,
      street,
      zip,
      city,
      state,
      country
    },
    mode = "save" // save or update
  ) => {
    createIdentity(
      firstname,
      lastname,
      cardId,
      passportId,
      avs,
      phone,
      email,
      streetNumber,
      street,
      zip,
      city,
      state,
      country
    )
      .then(result => {
        onCompleteLoading();
      })
      .catch(() => {
        onCompleteLoading();
      });
  };
  const onSelectIdentity = identity => {
    setState({ ...state, currentIdentity: identity });
  };

  const onCancelAction = () => {
    setState({ ...state, currentIdentity: {}, visible: false });
  };

  const showDrawer = () => {
    setState({ ...state, visible: true });
  };

  const onClose = () => {
    // Do not drop the actual edit inside the form
    setState({ ...state, visible: false });
  };

  useEffect(() => {
    const { send, close } = sockPubSub(message => {
      console.log("handling a message from the websocket", message);
      const { data } = message;
      const { type, ts, taskId, data: identity } = JSON.parse(data);
      console.log(type, ts, taskId, identity);
      if (type === "identityCreated") {
        const { identityList } = state;
        const list = [...identityList, identity];
        setState({ ...state, identityList: list, loading: false }); // bad practice according to react guidelines
      } else {
        setState({ ...state, loading: false }); // bad practice according to react guidelines
      }
    });
  });

  return (
    <div>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)"
        }}
        title="List of identities"
        tags={state.loading && <Tag color="blue">Pending action...</Tag>}
        extra={state.loading && <Spin indicator={antIcon} />}
      />
      <br /> {/* Bouh !!!! ;D */}
      <IdentityListing
        onSelectIdentity={onSelectIdentity}
        identityList={state.identityList}
      />
      <IdentityDrawer
        onClose={onClose}
        visible={state.visible}
        currentIdentity={state.currentIdentity}
        onSaveIdentity={addIdentity}
        onCancelAction={onCancelAction}
      />
      <Button type="primary" onClick={showDrawer}>
        Create identity
      </Button>
    </div>
  );
}
