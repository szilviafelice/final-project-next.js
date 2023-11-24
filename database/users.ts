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
      username = ${username.toLowerCase()}
  `;
    return user;

});

export const getUserWithPasswordHashByUsername = cache(async (username: string) => {

  const [user] = await sql<UserWithPasswordHash[]>`

    SELECT
      id,
      username,
      first_name AS "firstName",
      last_name AS "lastName",
      password_hash AS "passwordHash",
      email,
      ui_preference AS "uiPreference"
    FROM
      users
    WHERE
    username = ${username.toLowerCase()}
  `;
    return user;
},
);


export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users
    INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});

export const getUserBucketBySessionToken = cache(async (token: string) => {
  const buckets = await sql<User[]>`
    SELECT
      buckets.id AS bucket_id,
      buckets.text_content AS text_content,
      users.username AS username
    FROM
      buckets
    INNER JOIN
      buckets ON buckets.user_id = users.id
    INNER JOIN
      sessions ON  (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return buckets;
});
