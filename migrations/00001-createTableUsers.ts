import { Sql } from 'postgres';

export async function up(sql: Sql) {

  await sql `

    CREATE TABLE admin (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id integer UNIQUE REFERENCES users(id),
    is_admin boolean NOT NULL,
    admin_permissions varchar

    );
  `;
  }


  export async function down(sql: Sql) {

    await sql `
      DROP TABLE admin

    `;
  }
