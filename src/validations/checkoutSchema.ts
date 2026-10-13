import * as yup from "yup";

export const checkoutSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  address: yup
    .string()
    .trim()
    .required("Delivery address is required")
    .min(10, "Address must be at least 10 characters"),

  city: yup.string().trim().required("City is required"),

  pinCode: yup
    .string()
    .trim()
    .required("Postal code is required")
    .matches(/^[A-Za-z0-9 -]{3,8}$/, "Enter a valid postal code"),
});
