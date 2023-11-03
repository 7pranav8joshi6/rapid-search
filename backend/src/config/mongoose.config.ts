import { MongooseKeys } from "./keys.config";

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(MongooseKeys);
    console.log(
      "connection successful",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;
