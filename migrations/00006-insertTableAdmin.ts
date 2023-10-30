import { Sql } from 'postgres';

const admins = [
  {
      id: 1,
      userId: 1,
      is_admin: true,
      admin_permissions: "somePermissions"
  },
];


export async function up(sql: Sql) {
  for (const admin of admins) {
    await sql `
    INSERT INTO admin
        (user_id, is_admin, admin_permissions)
    VALUES

        (${admin.userId}, ${admin.is_admin}, ${admin.admin_permissions})
  `;
  }
}

export async function down(sql: Sql) {
  for (const admin of admins) {

    await sql`

      DELETE FROM admin WHERE id = ${admin.id}

    `;
  }
}
