import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByUsername } from '../../../../database/users';
import { User } from '../../../../migrations/00001-createTableUsers';

const registerSchema = z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    username: z.string().min(3),
    password: z.string().min(3),
    email: z.string().min(5)
})

export type RegisterResponseBodyPost =
    | {
      user: User;
    }
    | {
      errors: { message: string }[];
    };

export async function POST(request: NextRequest): Promise<NextResponse<RegisterResponseBodyPost>> {

  const body = await request.json()

  const result = registerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  const user = await getUserByUsername(result.data.username);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'username is already taken' }] },
      {
        status: 403,
      },
    );
  }

  const passwordHash = await bcrypt.hash(result.data.password, 12);

  const newUser = await createUser(
    result.data.firstname,
    result.data.lastname,
    result.data.username,
    passwordHash,
    result.data.email);

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Error creating the new user' }] },
      { status: 406 },
    );
  }

  return NextResponse.json({
      user: newUser,
  });

}
