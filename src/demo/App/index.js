import React from "react";
import { Row } from "antd";

import "antd/dist/antd.css";

import { HitsTable } from "../../components";

export const App = () => {
  return (
    <div style={{ padding: "2em", width: "100%", height: "100%" }}>
      <Row>
        <HitsTable
          columns={[]}
          filter={n => !Object.values(n).includes(undefined)}
        />
      </Row>
    </div>
  );
};
