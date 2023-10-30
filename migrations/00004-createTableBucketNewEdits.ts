import { Sql } from 'postgres';

export async function up(sql: Sql) {

  await sql `
        CREATE TABLE bucket_new_edits (
        id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id integer REFERENCES users(id),
        bucket_id integer REFERENCES buckets(id),
        update_types varchar,
        content text,
        update_timestamp date
    );
  `;
  }


  export async function down(sql: Sql) {

    await sql `
      DROP TABLE bucket_new_edits

    `;
  }
