import mongoose from "mongoose";

const dbConnect = async () => {
  logger.info("connect to database ...");
  try {
    mongoose.set("strictQuery", false);
    const connected = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Mongo db ${connected.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbConnect;
