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
    title: 'Date',
    dataIndex: 'dateCreated',
    render: defaultTimeFomat,
  },
  {
    title: 'File Size',
    dataIndex: 'fileSize',
  },
];

export const App = () => {
  return (
    <div style={{ padding: '2em', width: '100%', height: '100%' }}>
      <Row>
        <Col span={6}>
          <ActiveFiltersDisplay />
        </Col>
        <Col span={6}>
          <ClearFiltersDisplay />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={12}>
          <div style={{ width: 600 }}>
            <Row style={{ marginBottom: '1em' }}>
              <TextSearch />
            </Row>
            <Row style={{ marginBottom: '1em' }}>
              <Search queryFields={['jsonLD.text']} />
            </Row>
            <Row>
              <Sorter />
            </Row>
            <Row>
              <HitsTable columns={columns} />
            </Row>
          </div>
        </Col>
        <Col xs={24} md={12}>
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
