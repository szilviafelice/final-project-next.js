import React from 'react';
import styles from './profile.module.scss';

const ProfilePage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.profile}>
      <img src="/profile.jpg" alt="profilepicture" className={styles.image} />
      <h1>Szilvia Toth</h1>
      <p>Email: szilvia@gmail.com</p>< br/>< br/>
      <p>Bio: I’m Szilvia, an award winning independent diver/photographer writing about my visits to countries near and far. I love the planning, the anticipation, the journey, be it by plane, train, bus or boat and of course, the actual holiday and finally all the wonderful memories and experiences I bring home that live with me forever. < br/>< br/> That was the original reason why I created this profile so that I could have an online diary of my recent trips to look back on in the future.  I’ve been surprised but thrilled that so many of you have taken an interest in my travels and enjoy reading about my trips – it’s very encouraging and makes me very happy!

</p>< br/>
      <button className={styles.button}>Edit</button> {/* Stílus osztály használata */}
    </div>
    </div>
  );
};

export default ProfilePage;







/* type Props = {
  params: { username: string };
};

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <h2>{params.username} Profile</h2>
    </div>
  );
}*/
