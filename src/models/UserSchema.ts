import mongoose, { Schema, Document } from "mongoose";
import { Message } from "./MessageSchema";
import MessageSchema from "./MessageSchema";

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  otp: string;
  OTPExpiresAt: Date;
  messages: Message[];
  createdAt: Date;
}

const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "User Name Is Required!"],
    trim: true,
    minLength: [3, "User name must be of 3 character long!"],
    unique: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Enter a Valid Email Address!",
    ],
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Please Enter a Password!"],
    minlength: [6, "Password Must be 6 character long!"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  otp: {
    type: String,
    required: [true, "Please Enter the OTP!"],
  },
  OTPExpiresAt: {
    type: Date,
    required: [true, "Verification code expiration is required!"],
  },

  isAcceptingMessages: {
    type: Boolean,
    default: true,
  },

  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.Users as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
