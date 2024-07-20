import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import routes from './Routes/v1/Route';

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

// api routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});