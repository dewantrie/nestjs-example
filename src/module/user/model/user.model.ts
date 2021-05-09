import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  address: string;
}
