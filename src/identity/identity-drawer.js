import React from "react";

import { Drawer } from "antd";

import { WrappedIdentityForm } from "./identity-form";

const noop = () => {};

export function IdentityDrawer(props) {
  // Open question: Is this a good practice to reference props (functions actually)
  // passed to the componenent directly inside a child component
  const { onSaveIdentity = noop, onCancelAction = noop } = props;
  return (
    <div>
      <Drawer
        title="Create new Identity"
        placement="right"
        width="50pc"
        closable={true}
        onClose={props.onClose}
        visible={props.visible}
        getContainer={false}
        style={{ position: "absolute" }}
      >
        <WrappedIdentityForm
          onSubmit={onSaveIdentity}
          onCancel={onCancelAction}
        />
      </Drawer>
    </div>
  );
}
