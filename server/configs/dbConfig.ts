import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {});
    console.log(`DB is successfully hosted on: ${conn.connection.host}`);
  } catch (error) {
    console.log(`DB CONNECTION ERROR: ${error.message}`);
  }
};
