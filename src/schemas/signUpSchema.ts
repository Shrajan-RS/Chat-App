import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, "User name must be atleast 3 characters long!")
  .regex(/^[a-zA-Z0-9_]+$/, "User name must not contain special characters!");

export const signUpSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid email format!" }),
  password: z
    .string()
    .min(6, { message: "password should be minimum of 6 characters!" }),
});
