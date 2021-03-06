import React from 'react';

import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import 'antd/dist/antd.css';

import {
  HitsTable,
  Search,
  DateFilterCollapse,
  MentionsFilter,
  ActiveFiltersDisplay,
  ClearFiltersDisplay,
  Sorter,
  TextSearch,
} from '../../src/components';
import { defaultTimeFomat } from '@spotlightdata/nanowire-extensions/lib/helpers/table';

const columns = [
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Id',
    dataIndex: '_id',
  },
];

export const App = () => {
  return (
    <div style={{ padding: '2em', width: '100%', height: '100%' }}>
      <Row>
        <Col xs={24} md={16}>
          <div>
            <Row style={{ marginBottom: '1em' }}>
              <Col span={12}>
                <TextSearch />
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={12}>
                    <Row type="flex">
                      <ActiveFiltersDisplay />
                    </Row>
                  </Col>
                  <Col span={12}>
                    <ClearFiltersDisplay />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Sorter />
            </Row>
            <Row>
              <HitsTable columns={columns} />
            </Row>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ width: 374 }}>
            <Row type="flex" justify="center">
              <DateFilterCollapse />
              <MentionsFilter />
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};
