export enum InputFieldType {
  Text = "text",
  Paragraph = "paragraph",
  Checkbox = "checkbox",
  Select = "select",
}

export type FormInputField = {
  type: InputFieldType;
  label: string;
  required: boolean;
  key: string;
  value?: string;
};

export enum RequestStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

// table column with key, title field and any number of fields which can have value of any type
export type TableColumn<T> = {
  key: keyof T;
  title: string;
};

export type Filter = {
  key: string;
  value: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  university: string;
  address: {
    address: string;
    city: string;
    stateCode: string;
    postalCode: string;
  };
  eyeColor: string;
  birthDate: string;
  bloodGroup: string;
};

export type TablePaginationState = {
  currentPage: number;
  pageSize: number;
};

export type SliceState<T> = {
  data: T[];
  totalPages: number;
  status: RequestStatus;
  error?: string | null;
  pagination: {
    currentPage: number;
    pageSize: number;
  };
  filter: Filter;
};

export interface FetchActionParams {
  limit: number;
  page: number;
  filter?: Filter;
}

export interface FetchActionResponse<T> {
  data: T[];
  totalPages: number;
}
