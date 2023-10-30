import { Sql } from 'postgres';

export async function up(sql: Sql) {

  await sql `

      CREATE TABLE buckets (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users(id),
      name varchar NOT NULL,
      text_description varchar,
      date date,
      url bigint,
      image_url varchar,
      budget float,
      estimated_expense float,
      actual_expense float,
      is_shared boolean

          );
        `;
      }


  export async function down(sql: Sql) {

    await sql `
      DROP TABLE buckets

    `;
  }
