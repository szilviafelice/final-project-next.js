import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../database/sessions';

const AdminForm = ({ username }) => (
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welcome, {username}!</p>

  </div>
);

export default async function UserAdminPage({params}) {

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));


  if (!session) redirect('/login?returnTo=/users-admin');

  return <AdminForm username={session.username} />;

}
