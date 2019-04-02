import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema({
  login: String,
  password: String,
  rights: String
});

const Users = mongoose.model('Users', UsersSchema);

export default Users;
