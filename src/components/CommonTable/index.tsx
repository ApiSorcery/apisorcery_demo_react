import React from 'react';
import { Table, Button, Space, Image, Tag, Modal, message } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { SelectOption, UserModel, PaginationConfig } from '@/types/common';
import './index.scss';

interface CommonTableProps {
  loading: boolean;
  dataSource: UserModel[];
  pagination: PaginationConfig;
  optionsMap: Record<string, SelectOption[]>;
  onAdd: () => void;
  onEdit: (record: UserModel, index: number) => void;
  onDelete: (record: UserModel, index: number) => void;
  onLink: (record: UserModel, index: number) => void;
  onTableChange: (pagination: TablePaginationConfig) => void;
}

const CommonTable: React.FC<CommonTableProps> = ({
  loading,
  dataSource,
  pagination,
  optionsMap,
  onAdd,
  onEdit,
  onDelete,
  onLink,
  onTableChange,
}) => {
  const handleDelete = (record: UserModel, index: number) => {
    Modal.confirm({
      type: 'warning',
      title: 'Confirm',
      content: 'This operation will permanently delete the data. Do you want to continue?',
      okText: 'OK',
      cancelText: 'Cancel',
      onCancel: () => {
        message.info('Delete cancelled');
      },
      onOk: () => {
        onDelete(record, index);
      },
    });
  };

  const getStatusOption = (value: any, options: SelectOption[]) => {
    return options.find((opt) => opt.value === value);
  };

  const columns: ColumnsType<UserModel> = [
    {
      title: 'No.',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_text, _record, index) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      align: 'center',
      render: (text, record, index) => (
        <a onClick={() => onLink(record, index)} style={{ color: '#1677ff' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 180,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 120,
      render: (value) => {
        const option = getStatusOption(value, optionsMap.gender);
        return option ? <Tag color={option.color}>{option.label}</Tag> : '-';
      },
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      align: 'center',
      render: (url) => (url ? <Image src={url} width={50} height={50} /> : '-'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 240,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value) => {
        const option = getStatusOption(value, optionsMap.status);
        return option ? <Tag color={option.color}>{option.label}</Tag> : '-';
      },
    },
    {
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 160,
      render: (_text, record, index) => (
        <Space size="small">
          {record.id && record.id >= 2 && (
            <Button
              type="link"
              size="small"
              onClick={() => onEdit(record, index)}
              disabled={record.id === 2}
            >
              Edit
            </Button>
          )}
          <Button type="link" size="small" danger onClick={() => handleDelete(record, index)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="common-table">
      <div className="table-header">
        <h3>User Information</h3>
        <Button type="primary" onClick={onAdd}>
          Create
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        onChange={onTableChange}
        scroll={{ x: 1400 }}
      />
    </div>
  );
};

export default CommonTable;
