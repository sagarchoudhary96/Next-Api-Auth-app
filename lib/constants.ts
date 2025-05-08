import {
  FilterTypes,
  Product,
  TableColumn,
  TableFilterType,
  User,
} from "./types";

export const PAGE_TITLES: Record<string, string> = {
  "/users": "Users",
  "/products": "Products",
  "/": "Home",
};

export const PROTECTED_ROUTES = ["/users"];
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

export const USER_FILTERS: TableFilterType[] = [
  {
    key: "firstName",
    label: "Name",
    type: FilterTypes.TEXT,
  },
  {
    key: "email",
    label: "Email",
    type: FilterTypes.TEXT,
  },
  {
    key: "birthDate",
    label: "Birth Date",
    type: FilterTypes.TEXT,
  },
  {
    key: "gender",
    label: "Gender",
    type: FilterTypes.SELECT,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
];

export enum EntityType {
  Products = "products",
  Users = "users",
}

export const PRODUCT_TABLE_COLUMNS: TableColumn<Product>[] = [
  {
    key: "title",
    title: "Title",
  },
  {
    key: "category",
    title: "Category",
  },
  {
    key: "price",
    title: "Price",
  },
  {
    key: "rating",
    title: "Rating",
  },
  {
    key: "stock",
    title: "Stock",
  },
  {
    key: "brand",
    title: "Brand",
  },
  {
    key: "sku",
    title: "Sku",
  },
  {
    key: "warrantyInformation",
    title: "Warranty Information",
  },
  {
    key: "shippingInformation",
    title: "Shipping Information",
  },
  {
    key: "availabilityStatus",
    title: "Availability Status",
  },
  {
    key: "returnPolicy",
    title: "Return Policy",
  },
  {
    key: "minimumOrderQuantity",
    title: "Minimum Order Quantity",
  },
];

export const PRODUCT_FILTERS: TableFilterType[] = [
  {
    key: "title",
    label: "Title",
    type: FilterTypes.TEXT,
  },
  {
    key: "brand",
    label: "Brand",
    type: FilterTypes.TEXT,
  },
  {
    key: "category",
    label: "Category",
    type: FilterTypes.SELECT,
    options: [
      {
        value: "beauty",
        label: "Beauty",
      },
      {
        value: "fragrances",
        label: "Fragrances",
      },
      {
        value: "furniture",
        label: "Furniture",
      },
      {
        value: "groceries",
        label: "Groceries",
      },
      {
        value: "home-decoration",
        label: "Home decoration",
      },
      {
        value: "kitchen-accessories",
        label: "Kitchen accessories",
      },
      {
        value: "laptops",
        label: "Laptops",
      },
      {
        value: "mens-shirts",
        label: "Mens shirts",
      },
      {
        value: "mens-shoes",
        label: "Mens shoes",
      },
      {
        value: "mens-watches",
        label: "Mens watches",
      },
      {
        value: "mobile-accessories",
        label: "Mobile accessories",
      },
      {
        value: "motorcycle",
        label: "Motorcycle",
      },
      {
        value: "skin-care",
        label: "Skin care",
      },
      {
        value: "smartphones",
        label: "Smartphones",
      },
      {
        value: "sports-accessories",
        label: "Sports accessories",
      },
      {
        value: "sunglasses",
        label: "Sunglasses",
      },
      {
        value: "tablets",
        label: "Tablets",
      },
      {
        value: "tops",
        label: "Tops",
      },
      {
        value: "vehicle",
        label: "Vehicle",
      },
      {
        value: "womens-bags",
        label: "Womens bags",
      },
      {
        value: "womens-dresses",
        label: "Womens dresses",
      },
      {
        value: "womens-jewellery",
        label: "Womens jewellery",
      },
      {
        value: "womens-shoes",
        label: "Womens shoes",
      },
      {
        value: "womens-watches",
        label: "Womens watches",
      },
    ],
  },
];
