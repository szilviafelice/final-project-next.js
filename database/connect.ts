import { readFileSync } from 'node:fs';
import dotenv from 'dotenv';
import postgres from 'postgres';

export function setEnviromentVariables() {


  const unconfiguredEnvVars = Object.keys(
    // eslint-disable-next-line no-undef
    dotenv.parse(readFileSync('./.env.example')),
  ).filter((exampleKey) => !process.env[exampleKey]);

  if (unconfiguredEnvVars.length > 0) {
    throw new Error(
      `.env.example environment ${
        unconfiguredEnvVars.length > 1 ? 'variables' : 'variable'
      } ${unconfiguredEnvVars.join(', ')} not configured in .env file`,
    );
  }
  }

  setEnviromentVariables();

  const sql = postgres ();

  export async function getAllBucketsFromDatabase() {
    const animals = await sql`

    SELECT * FROM buckets
    `
  return animals;
  }
