import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserWithPasswordHashByUsername } from '../../../../database/users';

const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(3),
});

export type LoginResponseBodyPost =
    | {
      user: { username: string };
    }
    | {
      errors: { message: string }[];
    };

export async function POST(request: NextRequest): Promise<NextResponse<LoginResponseBodyPost>> {

  const body = await request.json();


  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const userWithPasswordHash = await getUserWithPasswordHashByUsername(result.data.username);


  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'username or password not valid' }] },
      {
        status: 403
      },
    );
  }

  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { errors: [{ message: 'username or password not valid' }] },
      {
        status: 401,
      },
    );
  }


  return NextResponse.json({
      user: {
        username: userWithPasswordHash.username,
  },
});

}
