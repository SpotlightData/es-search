import React from "react";

import { Row } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";

import "antd/dist/antd.css";

import { HitsTable } from "../../components";
import { defaultTimeFomat } from "@spotlightdata/nanowire-extensions/lib/helpers/table";

const columns = [
  {
    title: "Title",
    dataIndex: "name"
  },
  {
    title: "Date",
    dataIndex: "dateCreated",
    render: defaultTimeFomat
  },
  {
    title: "File Type",
    dataIndex: "fileSize"
  }
];

export const App = () => {
  return (
    <div style={{ padding: "2em", width: "100%", height: "100%" }}>
      <Row>
        <HitsTable
          columns={columns}
          filter={n => !Object.values(n).includes(undefined)}
        />
      </Row>
    </div>
  );
};
