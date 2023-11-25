
'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegisterForm() {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ message: string }[]>([]);
    const router = useRouter();


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


    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/profile/${data.user.username}`);

    router.refresh();

    /* if (response.ok) {
      const data = await response.json();
      console.log('Check: ', data);
  } else {
      console.error(`Error occurred: ${response.statusText}`);
  } */
}

  return (
    <form onSubmit={async (event) => await handleRegister(event)}>
      <label>
        First name&nbsp;&nbsp;
        <input onChange={(event) => setFirstname(event.currentTarget.value)} />
      </label>
      <label>
        Last name&nbsp;&nbsp;
        <input onChange={(event) => setLastname(event.currentTarget.value)} />
      </label> < br/>
      <label>
        Username&nbsp;&nbsp;
        <input onChange={(event) => setUsername(event.currentTarget.value)} />
      </label>< br/>
      <label>
        Password&nbsp;&nbsp;
        <input type="password" onChange={(event) => setPassword(event.currentTarget.value)} />
      </label>< br/>
      <label>
        Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input onChange={(event) => setEmail(event.currentTarget.value)} /> < br/>
      </label>< br/>
      <button  >Register</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}

      </form>
  )
}
