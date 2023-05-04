import { object, string } from "yup";

const emailSchema = string().email().max(256).required("An email is required.");
const passwordSchema = string()
  .min(8)
  .max(128)
  .required("A password is required.");

export const registerValidationSchema = object({
  email: emailSchema,
  password: passwordSchema.matches(
    /(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[@#$%^&-+=()!? "])).{8,128}$/,
    "Your password must have 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 special character or 1 number."
  ),
});

export const loginValidationSchema = object({
  email: emailSchema,
  password: passwordSchema,
});
