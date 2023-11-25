import { Sql } from 'postgres';

export type Profile = {
  profile_id: number;
  user_id: number;
  profile_picture: string;
  bio: string;
  email_address: string;
};

export async function up(sql: Sql) {
  // eslint-disable-next-line @ts-safeql/check-sql
  await sql`
    CREATE TABLE profiles (
      profile_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      profile_picture VARCHAR(255),
      bio TEXT,
      email_address VARCHAR(255) NOT NULL UNIQUE
    );
  `;
}

export async function down(sql: Sql) {
  // eslint-disable-next-line @ts-safeql/check-sql
  await sql`
    DROP TABLE profiles;
  `;
}
