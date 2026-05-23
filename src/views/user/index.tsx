import React, { useState, useEffect } from 'react';
import { Modal, message } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import CommonQuery from '@/components/CommonQuery';
import CommonTable from '@/components/CommonTable';
import CommonForm from '@/components/CommonForm';
import type {
  SelectOption,
  QueryModel,
  UserModel,
  PaginationConfig,
  OperateType,
} from '@/types/common';
import * as apiUser from '@/apis/auto/demo/ApiUser';
import dayjs from '@/utils/dayjs';
import './index.scss';

const User: React.FC = () => {
  const [queryModel, setQueryModel] = useState<QueryModel>({
    code: '',
    name: '',
  });

  const [tableLoading, setTableLoading] = useState(false);
  const [dataSource, setDataSource] = useState<UserModel[]>([]);
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [formVisible, setFormVisible] = useState(false);
  const [operateType, setOperateType] = useState<OperateType>('add');
  const [formModel, setFormModel] = useState<UserModel>({
    code: '',
    name: '',
    email: '',
    gender: null,
    avatar: '',
    address: '',
    status: false,
  });

  const optionsMap: Record<string, SelectOption[]> = {
    gender: [
      { value: 0, label: 'Unknown' },
      { value: 1, label: 'Male' },
      { value: 2, label: 'Female' },
    ],
    status: [
      { value: false, label: 'Disabled', color: 'gray' },
      { value: true, label: 'Enabled', color: '#1677ff' },
    ],
  };

  const getList = async () => {
    console.log('getList', pagination, queryModel);
    setTableLoading(true);
    try {
      const res = await apiUser.getUserPaged({
        pagination: {
          page: pagination.current,
          limit: pagination.pageSize,
        },
        ...queryModel,
      });
      const formattedData = (res.results || []).map((r: any) => ({
        ...r,
        gender: r.gender ?? null,
        avatar: r.avatar ?? '',
        address: r.address ?? '',
        status: r.status ?? false,
        createdAt: dayjs(r.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs(r.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
      }));
      setDataSource(formattedData);
      setPagination((prev) => ({ ...prev, total: res.total || 0 }));
    } catch (error) {
      console.error('Error fetching user list:', error);
      message.error('Failed to fetch user list');
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [pagination.current, pagination.pageSize]);

  const handleFilter = () => {
    console.log('handleFilter', queryModel);
    setPagination((prev) => ({ ...prev, current: 1 }));
    getList();
  };

  const handleReset = () => {
    console.log('handleReset');
    setQueryModel({ code: '', name: '' });
    setPagination((prev) => ({ ...prev, current: 1 }));
    setTimeout(() => {
      getList();
    }, 0);
  };

  const handleQueryChange = (values: Partial<QueryModel>) => {
    setQueryModel((prev) => ({ ...prev, ...values }));
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    console.log('handleTableChange', newPagination);
    setPagination({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 10,
      total: pagination.total,
    });
  };

  const handleAdd = () => {
    console.log('handleAdd');
    setOperateType('add');
    setFormModel({
      code: '',
      name: '',
      email: '',
      gender: null,
      avatar: '',
      address: '',
      status: false,
    });
    setFormVisible(true);
  };

  const handleLink = (record: UserModel, index: number) => {
    console.log('handleLink', record, index);
    setOperateType('view');
    setFormModel({ ...record });
    setFormVisible(true);
  };

  const handleEdit = (record: UserModel, index: number) => {
    console.log('handleEdit', record, index);
    setOperateType('edit');
    setFormModel({ ...record });
    setFormVisible(true);
  };

  const handleDelete = async (record: UserModel, index: number) => {
    console.log('handleDelete', record, index);
    try {
      await apiUser.removeUser({ id: record.id! });
      message.success('Deleted successfully!');
      getList();
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Failed to delete user');
    }
  };

  const handleFormSave = () => {
    setFormVisible(false);
    getList();
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };

  const handleExport = async () => {
    console.log('handleExport', queryModel);
    try {
      message.loading({ content: 'Exporting users...', key: 'export', duration: 0 });
      const response = await apiUser.exportUsers({
        code: queryModel.code || '',
        name: queryModel.name || '',
        email: '',
      });

      // Create download link
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = response.name || `users_${dayjs().format('YYYY-MM-DD_HH-mm-ss')}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success({ content: 'Export completed successfully!', key: 'export' });
    } catch (error) {
      message.error({ content: 'Export failed, please try again', key: 'export' });
      console.error('Export error:', error);
    }
  };

  const getFormTitle = () => {
    switch (operateType) {
      case 'add':
        return 'Create User';
      case 'edit':
        return 'Edit User';
      case 'view':
        return 'View User';
      default:
        return 'User';
    }
  };

  return (
    <div className="user-page">
      <div className="query-container">
        <CommonQuery
          model={queryModel}
          optionsMap={optionsMap}
          onFilter={handleFilter}
          onReset={handleReset}
          onChange={handleQueryChange}
          onExport={handleExport}
        />
      </div>
      <div className="table-container">
        <CommonTable
          loading={tableLoading}
          dataSource={dataSource}
          pagination={pagination}
          optionsMap={optionsMap}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onLink={handleLink}
          onTableChange={handleTableChange}
        />
      </div>
      <Modal
        open={formVisible}
        title={getFormTitle()}
        width={900}
        footer={null}
        onCancel={handleFormCancel}
        destroyOnClose
      >
        <CommonForm
          visible={formVisible}
          operateType={operateType}
          model={formModel}
          optionsMap={optionsMap}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      </Modal>
    </div>
  );
};

export default User;
