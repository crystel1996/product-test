import pgp from  'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = pgp(`${process.env.DATABASE_TYPE}://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}` as any);