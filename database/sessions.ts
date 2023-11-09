/* eslint-disable @ts-safeql/check-sql */
import { cache } from 'react';
import { sql } from '../database/connect';
import { Session } from '../migrations/00008-createTableSessions';

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM sessions
    WHERE
      expiry_timestamp < now ()
  `;
});

export const createSession = cache(
  async (userId: number, token: string) => {
  const [session] = await sql<Session[]>`
    INSERT INTO
      sessions (
        user_id,
        token
      )
    VALUES
      (${userId}, ${token})
      RETURNING
      id,
      token,
      user_id
  `;

  await deleteExpiredSessions();

  return session;
});
