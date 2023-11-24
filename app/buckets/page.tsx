import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  getUserBucketBySessionToken,
  getUserBySessionToken,
} from '../../database/users';
import BucketPopup from './BucketPopup';
import CreateBucketsForm from './CreateBucketsForm';

const BucketsPage = () => {
  const [user, setUser] = useState(null);
  const [userBucket, setUserBucket] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

export default function BucketsPage({ user, userBucket }) {
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleBucketClick = (bucket) => {
    setSelectedBucket(bucket);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const deleteBucket = async (bucketId) => {
    const newBucketList = userBucket.filter((bucket) => bucket.bucketId !== bucketId);
    closePopup();
  };
//

export default async function BucketsPage() {

const sessionTokenCookie = cookies().get('sessionToken');

const user = sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

    if (!user) redirect('/login?returnTo=/buckets');

    const userBucket = await getUserBucketBySessionToken(sessionTokenCookie.value);

    console.log("userBucket array:", userBucket);


  return (

    <div className="buckets-page-container">
    <div className="bucket-form-container">
      <CreateBucketsForm userId={user.id} />

        <br />
        <br />
        <br />

      {userBucket.length > 0 ? (
        <>
          <h2>Bucketslists for {user.username}</h2>

            <ul>
              {userBucket.map((bucket) => (
                <li key={`bucket-${bucket.bucketId}`} onClick={() => handleBucketClick(bucket)}>
                {bucket.name}
              </li>
              ))}
            </ul>
          </>
        ) : (
          <h2> No list yet</h2>
        )}
      </div>
      {showPopup && (
        <BucketPopup
          bucket={selectedBucket}
          onClose={closePopup}
          onDelete={deleteBucket}
        />
      )}
    </div>

      );
    };
