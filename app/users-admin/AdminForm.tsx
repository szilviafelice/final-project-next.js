'use client';
import { useState } from 'react';

// import { User } from '../../migrations/00001-createTableUsers';

type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  uiPreference: boolean | null;
};

type Props = {
  users: User[];
};

export default function AdminForm({ users }: Props) {
  const [userList, setUserList] = useState(users);
  const [firstnameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');

  async function createUser() {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: firstnameInput,
        lastname: lastnameInput,
        username: usernameInput,
        email: emailInput,
      }),
    });

    if (!response.ok) {
      // Hiba kezelése
      console.error('There was an error creating a user');
      return;
    }

    const newUser = await response.json();
    setUserList([...userList, newUser]);
    // Input mezők ürítése
    setFirstnameInput('');
    setLastnameInput('');
    setUsernameInput('');
    setEmailInput('');
  }

  async function deleteUserById(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      console.error('Was an error deleteing the user');
      return;
    }

    setUserList(userList.filter((user) => user.id !== id));

    return (
      <>
        <div>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await createUser();
            }}
          >
            <label>
              First Name:
              <input
                value={firstnameInput}
                onChange={(event) => setFirstnameInput(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                value={lastnameInput}
                onChange={(event) => setLastnameInput(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              Username:
              <input
                value={usernameInput}
                onChange={(event) => setUsernameInput(event.currentTarget.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                value={emailInput}
                onChange={(event) => setEmailInput(event.currentTarget.value)}
              />
            </label>
            <br />
            <button>Create User</button>
          </form>
        </div>
        <br />
        {userList.map((user) => (
          <div key={`user-${user.id}`}>
            <span>{user.firstname} {user.lastname} - {user.username}</span>
            <button onClick={async () => await deleteUserById(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </>
    );
        }}
*/
