import { TableColumn, User } from "./types";

export const USER_TABLE_COLUMNS: TableColumn<User>[] = [
  {
    key: "firstName",
    title: "First Name",
  },
  {
    key: "lastName",
    title: "Last Name",
  },
  {
    key: "maidenName",
    title: "Maiden Name",
  },
  {
    key: "age",
    title: "Age",
  },
  {
    key: "gender",
    title: "Gender",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "phone",
    title: "Phone",
  },
  {
    key: "username",
    title: "Username",
  },
  {
    key: "birthDate",
    title: "Birth Date",
  },
  {
    key: "bloodGroup",
    title: "Blood Group",
  },
  {
    key: "eyeColor",
    title: "Eye Color",
  },
  {
    key: "university",
    title: "University",
  },
];

export const USER_FILTERS = [
  {
    key: "firstName",
    label: "Name",
    options: [],
  },
];
