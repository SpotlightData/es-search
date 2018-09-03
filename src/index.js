import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import Initial from "./components/Initial";

const load = () =>
  render(
    <AppContainer>
      <Initial />
    </AppContainer>,
    document.getElementById("root")
  );

if (module.hot) {
  module.hot.accept("./components/Initial", load);
}

load();
