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
