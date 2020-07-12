import mongoose from 'mongoose';
import requireDir from 'require-dir';

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

requireDir('../app/models');

export default mongoose;
