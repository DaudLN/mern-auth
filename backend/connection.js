import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MERN_DB_URL } = process.env;

const connection = () =>
  mongoose
    .set('strictQuery', false)
    .connect(MERN_DB_URL, {})
    .then((conn) =>
      console.log(`Database connected at ${conn.connection.host}`)
    )
    .catch((err) => console.log(err.message));

export default connection;
