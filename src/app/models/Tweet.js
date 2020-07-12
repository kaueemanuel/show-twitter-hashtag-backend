import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema({
  hashtag: {
    type: String,
    trim: true,
    required: true,
  },
  nome: {
    type: String,
    trim: true,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Tweet', TweetSchema);
