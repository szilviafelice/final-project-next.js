import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00001-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
  INSERT INTO users
  (username, password_hash)
  VALUES
    (${username.toLowerCase()}, ${passwordHash})
  RETURNING
    id,
    username,
    first_name AS "firstName",
    last_name AS "lastName",
    password_hash AS "passwordHash",
    email,
    google_id AS "googleId",
    ui_preference AS "uiPreference"
    `;
    return user;
  },
);
