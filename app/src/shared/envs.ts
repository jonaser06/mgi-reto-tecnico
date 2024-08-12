import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  JWT_SECRET: string;
  DB_SCHEMA: string;
  DATABASE_URL: string;
}

const envSchema = joi.object({
  PORT: joi.number().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PORT: joi.number().required(),
  DB_NAME: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  DB_SCHEMA: joi.string().required(),
  DATABASE_URL: joi.string().required(),
}).unknown();

const { error, value } = envSchema.validate( process.env );

if( error ) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbName: envVars.DB_NAME,
  jwtSecret: envVars.JWT_SECRET,
  dbSchema: envVars.DB_SCHEMA,
  databaseUrl: envVars.DATABASE_URL,
}