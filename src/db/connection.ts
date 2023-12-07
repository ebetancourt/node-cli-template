import { Sequelize } from 'sequelize';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '..', 'data', 'database.sqlite'),
});

// test DB connection
export const testDbConnection = async () => {
    try {
        await db.authenticate();
        console.log('🎉 Connection has been established successfully.');
    } catch (error) {
        console.error('⛔ Unable to connect to the database:', error);
    }
};

export default db;
