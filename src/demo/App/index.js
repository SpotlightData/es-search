import React from "react";

import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";

import "antd/dist/antd.css";

import { HitsTable, Search, DateFilter } from "../../components";
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
    title: "File Size",
    dataIndex: "fileSize"
  }
];

export const App = () => {
  return (
    <div style={{ padding: "2em", width: "100%", height: "100%" }}>
      <Row>
        <Col span={12}>
          <div style={{ width: 600 }}>
            <Row style={{ marginBottom: "1em" }}>
              <Search queryFields={["jsonLD.name"]} />
            </Row>
            <Row>
              <HitsTable
                columns={columns}
                filter={n => !Object.values(n).includes(undefined)}
              />
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ width: 374 }}>
            <DateFilter />
          </div>
        </Col>
      </Row>
    </div>
  );
};
