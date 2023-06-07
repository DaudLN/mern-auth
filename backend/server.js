import app from './app.js';
import dotenv from 'dotenv';
import connection from './connection.js';
dotenv.config();

connection();
const MERN_PORT = process.env.MERN_PORT || 5000;

app.listen(MERN_PORT, () => {
  console.log('App is running on port ' + MERN_PORT);
});
