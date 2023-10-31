import { Sql } from 'postgres';

export type User = {
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      passwordHash: string;
      email: string;
      googleId: string | null;
      uiPreference: boolean | null;
};

export async function up(sql: Sql) {

  await sql `

    CREATE TABLE users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        username VARCHAR(80) NOT NULL UNIQUE,
        password_hash VARCHAR(80) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        google_id VARCHAR(80),
        ui_preference BOOLEAN NOT NULL
    );
  `;
  }

  export async function down(sql: Sql) {

    await sql `
      DROP TABLE users

    `;
  }
