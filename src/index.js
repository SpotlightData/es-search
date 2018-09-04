import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { SearchkitProvider } from "./components";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

const providerProps = {
  url: process.env.URL,
  projectId: process.env.PROJECT,
  token: process.env.TOKEN
};

const load = () => {
  const SKProvider = withRouter(SearchkitProvider);
  render(
    <AppContainer>
      <Router key={Math.random()}>
        <SKProvider {...providerProps}>
          <div>asdasd</div>
        </SKProvider>
      </Router>
    </AppContainer>,
    document.getElementById("root")
  );
};

if (module.hot) {
  module.hot.accept("./components", load);
}

console.log(process.env);

load();
