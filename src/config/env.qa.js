import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from config/.env
dotenv.config({ path: join(__dirname, '.env') });

export default {
  baseUrl: 'https://zenetratechnologies.com/practice-app',
  apiBaseUrl: 'https://restful-booker.herokuapp.com',
  credentials: {
    username: process.env.QA_USERNAME,
    password: process.env.QA_PASSWORD,
  },
  apiCredentials: {
    username: process.env.QA_API_USERNAME,
    password: process.env.QA_API_PASSWORD,
  },
};
