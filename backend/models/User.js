import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hash(user.password, 10);
  }
  next();
});

const User = model('User', userSchema);

export default User;
