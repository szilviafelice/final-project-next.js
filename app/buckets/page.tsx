/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import {
  getUserBucketBySessionToken,
  getUserBySessionToken,
} from '../../database/users';
import styles from './bucket.module.scss';
import CreateBucketsForm from './CreateBucketsForm';

export default async function BucketsPage() {
  const sessionTokenCookie = cookies().get('sessionToken');

const user = sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

    if (!user) redirect('/login?returnTo=/buckets');

    const userBucket = await getUserBucketBySessionToken(sessionTokenCookie.value);

    console.log("userBucket array:", userBucket);

    return (
      <div className={styles['buckets-page-container']}>
      <div className={styles['bucket-form-container']}>
          <CreateBucketsForm userId={user.id} />
          <br />
          <br />
          <br />
          {userBucket.length > 0 ? (
            <>
             <h2>Bucketslists for {user.username}</h2>
            <ul>
              {userBucket.map((bucket) => (

                <li key={`bucket-${bucket.bucketId}`}>{bucket.name}</li>
              ))}
            </ul>
          </>
        ) : (
          <h2>No bucketlist yet</h2>
        )}
      </div>
    </div>
  );
};
