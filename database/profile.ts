import { sql } from './connect';

export type Profile = {
  profile_id: number;
  user_id: number;
  profile_picture: string;
  bio: string;
  email_address: string;
};


export const createProfile = async (
  userId: number,
  profilePicture: string,
  bio: string,
  emailAddress: string
) => {
  // eslint-disable-next-line @ts-safeql/check-sql
  const [profile] = await sql<[Profile?]>`
    // eslint-disable-next-line @ts-safeql/check-sql
    INSERT INTO profiles (
      user_id,
      profile_picture,
      bio,
      email_address
    )
    VALUES (
      ${userId},
      ${profilePicture},
      ${bio},
      ${emailAddress}
    )
    RETURNING *
  `;

  if (!profile) {
    throw new Error('Profile creation failed');
  }

  return profile;
};
