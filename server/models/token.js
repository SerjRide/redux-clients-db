import mongoose, { Schema } from 'mongoose';

const TokenSchema = new Schema({
  tokenId: String,
  userId: String
});

const Token = mongoose.model('Token', TokenSchema);

export default Token;
