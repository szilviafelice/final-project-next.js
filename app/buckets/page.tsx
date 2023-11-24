import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';
import CreateBucketsForm from './CreateBucketsForm';

export default async function BucketsPage() {

const sessionTokenCookie = cookies().get('sessionToken');

const user = sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

    if (!user) redirect('/login?returnTo=/buckets');

  return (

        <div className="buckets-page-container">
            <div className="bucket-form-container">
            <CreateBucketsForm userId={user.id} />

            </div>
        </div>
        );
    }
