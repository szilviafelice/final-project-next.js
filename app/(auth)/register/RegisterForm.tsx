
'use client'
import { useState } from 'react';

export default function RegisterForm() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          password,
          email
        }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Check: ', data);
  } else {
      console.error(`Error occurred: ${response.statusText}`);
  }
}

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <label>
        First name
        <input onChange={(event) => setFirstname(event.currentTarget.value)} />
      </label>
      <label>
        Last name
        <input onChange={(event) => setLastname(event.currentTarget.value)} />
      </label>
      <label>
        Username
        <input onChange={(event) => setUsername(event.currentTarget.value)} />
      </label>
      <label>
        Password
        <input type="password" onChange={(event) => setPassword(event.currentTarget.value)} />
      </label>
      <label>
        Email
        <input onChange={(event) => setEmail(event.currentTarget.value)} />
      </label>
      <button  >Register</button>
      </form>
  )
}
