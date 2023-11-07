'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/* import { LoginResponseBodyPost } from '../../api/(auth)/login/route'; */

export default function LoginForm() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ message: string }[]>([]);
    const router = useRouter();


  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/login', {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
    });


    const data = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/`);

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
        Username
        <input onChange={(event) => setUsername(event.currentTarget.value)} />
      </label>
      <label>
        Password
        <input type="password"
        onChange={(event) => setPassword(event.currentTarget.value)} />
      </label>

      <button>Login</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}

      </form>
  )
}
