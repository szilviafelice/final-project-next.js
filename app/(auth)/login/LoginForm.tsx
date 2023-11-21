'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

/* import { LoginResponseBodyPost } from '../../api/(auth)/login/route'; */

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {


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


    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }


    router.push(
      getSafeReturnToPath(props.returnTo) || `/`);

    router.refresh();
}

  return (
    <div className="form-container">
    <h2>Happy to see you again.</h2>
    <form onSubmit={async (event) => await handleRegister(event)}>

        <label>
        Username
        <input onChange={(event) => setUsername(event.currentTarget.value)} />
      </label>
      < br/>
      < br/>
      <label>
        Password
        <input type="password"
        onChange={(event) => setPassword(event.currentTarget.value)} />
      </label>
      < br/>
      < br/>
      <button>Login</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          Error: {error.message}
        </div>
      ))}

      </form> </div>
  )
}
