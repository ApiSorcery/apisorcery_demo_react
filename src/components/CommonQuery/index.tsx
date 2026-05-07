import React from 'react';
import { Form, Input, Select, Button, Space } from 'antd';
import type { SelectOption, QueryModel } from '@/types/common';
import './index.scss';

interface CommonQueryProps {
  model: QueryModel;
  optionsMap: Record<string, SelectOption[]>;
  onFilter: () => void;
  onReset: () => void;
  onChange: (values: Partial<QueryModel>) => void;
}

const CommonQuery: React.FC<CommonQueryProps> = ({
  model,
  optionsMap,
  onFilter,
  onReset,
  onChange,
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = (_: any, allValues: QueryModel) => {
    onChange(allValues);
  };

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onFilter();
    }
  };

  return (
    <div className="common-query">
      <Form
        form={form}
        layout="inline"
        initialValues={model}
        onValuesChange={handleValuesChange}
        onKeyDown={handleKeyDown}
      >
        <Form.Item label="Code" name="code" style={{ marginBottom: 12 }}>
          <Input placeholder="Please enter" style={{ width: 200 }} />
        </Form.Item>
        <Form.Item label="Name" name="name" style={{ marginBottom: 12 }}>
          <Input placeholder="Please enter" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label="Status" name="status" style={{ marginBottom: 12 }}>
          <Select
            placeholder="Please select"
            style={{ width: 130 }}
            allowClear
            options={optionsMap.status}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 12 }}>
          <Space>
            <Button type="primary" onClick={onFilter}>
              Search
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommonQuery;
