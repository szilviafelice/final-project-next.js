import { Sql } from 'postgres';

export type Bucket = {
  id: number;
  userId: number | null;
  name: string;
  textDescription: string | null;
  date: string | null;
  url: bigint | null; //
  imageUrl: string | null;
  budget: number | null;
  estimatedExpense: number | null;
  actualExpense: number | null;
  isShared: boolean | null;
};


export async function up(sql: Sql) {

  // eslint-disable-next-line @ts-safeql/check-sql
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

    // eslint-disable-next-line @ts-safeql/check-sql
    await sql `
      DROP TABLE buckets

    `;
  }
