import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "typeface-roboto";
import "./styles.css";

/*
https://ant.design/components/card/
https://reactjs.org/docs/conditional-rendering.html
https://jsonplaceholder.typicode.com/guide.html
https://reactjs.org/docs/components-and-props.html
*/

/*
import { MyButton } from "./button";
import { Todos } from "./todos";
*/
import { AppLayout } from "./layout";
import { IdentityPane } from "./identity/identity-pane";

const noop = () => {};

function App() {
  const onNewTaksEvent = task => {
    updateTaskList(task);
  };

  const updateTaskList = newTask => {};

  return (
    <div className="App">
      {/*<Todos />
      
      <MyButton
        delegate={() => {
          alert("test");
        }}
      />
      */}
      <AppLayout
        nodeContent={
          <IdentityPane onLoadingStart={noop} onNewTaksEvent={onNewTaksEvent} />
        }
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
