import { readFileSync } from 'node:fs';
import dotenv from 'dotenv';
import postgres from 'postgres';

/* type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  passwordHash: string;
  email: string;
  googleId: string | null;
  uiPreference: boolean | null;
}; */


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

  export const sql = postgres ();

  export async function getAllUsersFromDatabase() {
    // eslint-disable-next-line @ts-safeql/check-sql
    const users = await sql<{ id: number; firstName: string; lastName: string; username: string; passwordHash: string; email: string;  uiPreference: boolean | null; }[]>`

    SELECT * FROM users
    `
  return users;
  }
