import { Model, Schema, model } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'

export interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  passwordResetToken?: string;
  passwordResetTokenExpire?: Date
  passwordChangeAt?: Date
  level: number;
  xp: number;
}

export interface IUserMethods {

}

export interface IUserVirtuals {

}

type TUserModel = Model<IUser, {}, IUserMethods, IUserVirtuals>

const UserSchema = new Schema<IUser, TUserModel, IUserMethods, IUserVirtuals>({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  avatar: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'A password should have at least 6 characters'],
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetTokenExpire: {
    type: Date,
    select: false,
  },
  passwordChangeAt: {
    type: Date,
    select: false,
  },
  level: {
    type: Number,
    default: 1,
  },
  xp: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8)
  next();
})


export const User: TUserModel = model<IUser, TUserModel>("User", UserSchema);
