import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pushSubscription: { type: Object, default: null }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
