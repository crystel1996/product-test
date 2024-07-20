import express from 'express';
import dotenv from 'dotenv';
import routes from './Routes/v1/Route';

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});