import mongoose from 'mongoose';

const MONGO_CLOUD = process.env.MONGO_CLOUD;
mongoose.Promise = global.Promise;

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
  } catch (err) {
    console.error(err);
    // process.exit(1);
  }
}

export const pharmacyRx = mongoose.connection.useDb('pharmacyRx');