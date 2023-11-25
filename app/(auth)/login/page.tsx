import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionByToken } from '../../../database/sessions';
import LoginForm from './LoginForm';

type Props = { searchParams: { returnTo?: string | string[] } };

export default async function LoginPage({ searchParams }: Props) {

  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
  sessionTokenCookie &&
  (await getValidSessionByToken(sessionTokenCookie.value));

  // console.log('Sessions: ', session);

  if(session) redirect('/');

  return (

    <div className="backgroundLog">
    <div className="form-container login-form-container">
      <LoginForm returnTo={searchParams.returnTo} />
    </div>
    </div>
  );
}
