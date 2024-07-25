import mongoose from 'mongoose';

const MongoUrl = 'mongodb://localhost:27017/Recipe';

export const ConnectToMongo = async () => {
  try {
    await mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.log('Failed to connect to MongoDB', error);
  }
};
