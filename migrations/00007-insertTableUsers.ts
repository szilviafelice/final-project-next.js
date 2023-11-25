import { Sql } from 'postgres';

const users = [
  {
      id: 1,
      first_name: 'Szilvia',
      last_name: 'Toth',
      username: 'sziszi',
      password_hash: 'hashedpassword',
      email: 'xy@gmail.com',
      ui_preference: false
  },
];


export async function up(sql: Sql) {
  for (const user of users) {
    // eslint-disable-next-line @ts-safeql/check-sql
    await sql `
    INSERT INTO users
    (first_name, last_name, username, password_hash, email,  ui_preference)
    VALUES

        (${user.first_name}, ${user.last_name}, ${user.username}, ${user.password_hash}, ${user.email}, ${user.ui_preference}
        )
  `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {

    // eslint-disable-next-line @ts-safeql/check-sql
    await sql`

      DELETE FROM admin WHERE id = ${user.id}

    `;
  }
}
