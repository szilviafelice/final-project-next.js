/* eslint-disable @ts-safeql/check-sql */
import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00001-createTableUsers';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const createUser = cache(
  async (firstname: string, lastname: string, username: string, passwordHash: string, email: string) => {
    const [user] = await sql<User[]>`

  INSERT INTO users
  (first_name, last_name, username, password_hash, email)
  VALUES
    (${firstname}, ${lastname}, ${username.toLowerCase()}, ${passwordHash}, ${email})
  RETURNING
    id,
    first_name,
    last_name,
    username,
    email
    `;
    return user;
  },
);


export const getUserByUsername = cache(async (username: string) => {

  const [user] = await sql<{ id: number; username: string; }[]>`

    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;

});

export const getUserWithPasswordHashByUsername = cache(async (username: string) => {

  const [user] = await sql<UserWithPasswordHash[]>`

    SELECT
      id,
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
    return user;
});
