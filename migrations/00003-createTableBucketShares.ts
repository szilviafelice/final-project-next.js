import { Sql } from 'postgres';

export async function up(sql: Sql) {

  await sql `

      CREATE TABLE bucket_shares (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      bucket_id integer REFERENCES buckets(id),
      shared_with_user_id integer REFERENCES users(id),
      bucket_user_owner_id integer REFERENCES users(id)
    );
  `;
  }


  export async function down(sql: Sql) {

    await sql `
      DROP TABLE bucket_shares

    `;
  }
