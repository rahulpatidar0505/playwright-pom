import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from config/.env
dotenv.config({ path: join(__dirname, '.env') });

// Note: Production config exists but uses QA credentials for demo purposes
export default {
  baseUrl: 'https://prod.zenetratechnologies.com/practice-app',
  apiBaseUrl: 'https://restful-booker.herokuapp.com',
  credentials: {
    username: process.env.QA_USERNAME || 'admin',
    password: process.env.QA_PASSWORD || 'admin123',
  },
  apiCredentials: {
    username: process.env.QA_API_USERNAME || 'admin',
    password: process.env.QA_API_PASSWORD || 'password123',
  },
};
