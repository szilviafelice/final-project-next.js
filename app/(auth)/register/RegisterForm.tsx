
'use client'
import { useState } from 'react';

export default function RegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
    });

    const data = response.json()
    console.log('Check: ', data)
  }

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <label>
        Username
        <input onChange={(event) => setUsername(event.currentTarget.value)} />
      </label>
      <label>
        Password
        <input type="password" onChange={(event) => setPassword(event.currentTarget.value)} />
      </label>
      <button type="submit">Register</button>
      </form>
  )
}
