export interface SelectOption {
  value: any;
  label: string;
  color?: string;
}

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
}

export interface QueryModel {
  code?: string;
  name?: string;
  status?: boolean;
}

export interface UserModel {
  id?: number;
  code: string;
  name: string;
  email: string;
  gender: number | null;
  avatar: string;
  address: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type OperateType = 'add' | 'edit' | 'view';
