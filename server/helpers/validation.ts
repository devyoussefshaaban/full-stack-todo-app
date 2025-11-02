import * as Yup from "yup";

export const registerUserSchema = Yup.object({
  name: Yup.string()
    .required("Usernam is required")
    .min(3, "Username must contain at least 3 characters")
    .max(30, "Username can not contain more than 30 characters"),
  email: Yup.string()
    .email("Please, enter a valid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password nust contain at least 8 characters"),
});

export const loginUserSchema = Yup.object({
  email: Yup.string()
    .email("Please, enter a valid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password nust contain at least 8 characters"),
});
