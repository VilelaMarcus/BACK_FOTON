import { config } from 'dotenv';
import { bool, cleanEnv, port, str } from 'envalid';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const validateEnviromentalVariables = () => {
  cleanEnv(process.env, {
    PORT: port(),
    LOG_FORMAT: str(),
    ORIGIN: str(),
    CREDENTIAL: bool(),
    AUTH0_DOMAIN: str(),
    AUTH0_AUDIENCE: str(),
    DATABASE_URL: str(),
  });
};

export default validateEnviromentalVariables;
