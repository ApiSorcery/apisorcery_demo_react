import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Switch, Button, Space, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload';
import type { SelectOption, UserModel, OperateType } from '@/types/common';
import * as apiUser from '@/apis/auto/demo/ApiUser';
import './index.scss';

interface CommonFormProps {
  visible: boolean;
  operateType: OperateType;
  model: UserModel;
  optionsMap: Record<string, SelectOption[]>;
  onSave: () => void;
  onCancel: () => void;
}

const CommonForm: React.FC<CommonFormProps> = ({
  visible,
  operateType,
  model,
  optionsMap,
  onSave,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(model);
      // Set file list for avatar
      if (model.avatar) {
        setFileList([
          {
            uid: '-1',
            name: 'avatar.png',
            status: 'done',
            url: model.avatar,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [visible, model, form]);

  const validateCode = async (_: any, value: string) => {
    if (!value) return Promise.resolve();
    if (operateType !== 'add') return Promise.resolve();
    try {
      const codeExists = await apiUser.validateCode({ code: value });
      if (codeExists) {
        return Promise.reject(new Error('Code already exists'));
      }
      return Promise.resolve();
    } catch (error) {
      console.error('Code validation error:', error);
      return Promise.reject(new Error('Code validation failed, please try again'));
    }
  };

  const handleBeforeUpload = (file: File) => {
    const size = Number((file.size / 1024 / 1024).toFixed(2));
    if (size > 10) {
      message.warning('File size exceeds limit (10MB), please select again!');
      return false;
    }
    return true;
  };

  const handleUploadChange = (info: UploadChangeParam) => {
    setFileList(info.fileList);
    if (info.file.status === 'done' && info.file.response?.status === 0) {
      const avatarUrl = `${import.meta.env.VITE_GLOB_BASE_API}/file/${info.file.response.data}`;
      form.setFieldValue('avatar', avatarUrl);
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (model.id) {
        await apiUser.modifyUser({ ...values, id: model.id });
      } else {
        await apiUser.addUser(values);
      }
      message.success('Saved successfully');
      setLoading(false);
      onSave();
    } catch (error) {
      console.error('Error saving form:', error);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const isViewMode = operateType === 'view';

  return (
    <Form
      form={form}
      layout="horizontal"
      labelCol={{ style: { width: '80px' } }}
      wrapperCol={{ style: { flex: 1 } }}
      disabled={isViewMode}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <Form.Item
          label="Code"
          name="code"
          rules={[
            { required: true, message: 'Cannot be empty' },
            { validator: operateType === 'add' ? validateCode : undefined },
          ]}
        >
          <Input placeholder="Please enter" disabled={operateType !== 'add'} />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Cannot be empty' }]}
        >
          <Input placeholder="Please enter" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Cannot be empty' }]}
        >
          <Input placeholder="Please enter" />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Radio.Group options={optionsMap.gender} />
        </Form.Item>

        <Form.Item label="Address" name="address" style={{ gridColumn: '1 / -1' }}>
          <Input.TextArea placeholder="Please enter" rows={3} />
        </Form.Item>

        <Form.Item label="Avatar" name="avatar">
          <div className="avatar-upload">
            <Upload
              name="file"
              listType="picture-card"
              fileList={fileList}
              action={`${import.meta.env.VITE_GLOB_BASE_API}/file/upload`}
              beforeUpload={handleBeforeUpload}
              onChange={handleUploadChange}
              maxCount={1}
              disabled={isViewMode}
            >
              {fileList.length === 0 && uploadButton}
            </Upload>
          </div>
        </Form.Item>

        <Form.Item label="Enabled" name="status" valuePropName="checked">
          <Switch />
        </Form.Item>
      </div>

      <Form.Item wrapperCol={{ offset: 0 }} style={{ marginTop: 24, marginBottom: 0 }}>
        <Space style={{ float: 'right' }}>
          <Button onClick={onCancel}>Cancel</Button>
          {!isViewMode && (
            <Button type="primary" loading={loading} onClick={handleSave}>
              OK
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CommonForm;
