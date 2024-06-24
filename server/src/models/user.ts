import { Model, Schema, model } from "mongoose";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { IUser, IUserMethods, IUserVirtuals } from "../interfaces/user";

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
  avatar: {
    type: String,
    default: 'https://uyjetoiilsjpcdzissja.supabase.co/storage/v1/object/public/images/default-avatar.jpg',
  },
  banner: {
    type: String,
    default: 'https://uyjetoiilsjpcdzissja.supabase.co/storage/v1/object/public/images/default-background.png',
  },
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
  elo: {
    type: Number,
    default: 500,
  },
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 8)
  next();
})

UserSchema.methods.comparePassword = async function (candidate, hash) {
  return await bcrypt.compare(candidate, hash)
}




export const User: TUserModel = model<IUser, TUserModel>("User", UserSchema);
