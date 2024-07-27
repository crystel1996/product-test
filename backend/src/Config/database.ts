import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { MODEL } from './../Model'

dotenv.config();

export const dataSource = new DataSource({
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT as any,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/dist/**/*.entity.{js,ts}'],
    synchronize: true, //only for dev environment, not for production,
    extra: {
        ssl: true
    }
})

export const isAuthenticated = async () => {
    try {
        await dataSource.initialize();
        console.log('Connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false;
    }
}