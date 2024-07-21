import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import 'reflect-metadata';
import routes from './Routes/v1/Route';
import { isAuthenticated } from './Config/database';
import { verifyToken } from './Middleware/AuthMiddleware';

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// Cors options
const corsOptions = {
  origin:  process.env.PORT,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(cors());

app.use(verifyToken);

// api routes
app.use('/api', routes);

app.listen(port, async () => {
  const isAuthenticatedValue = await isAuthenticated();
  if(isAuthenticatedValue) {
    console.log(`Server is running at http://localhost:${port}`);
  } else {
    console.log(`Connect to database failed.`);
  }
});