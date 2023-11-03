import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { User } from '../../../../migrations/00001-createTableUsers';

const registerSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(3),

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

  console.log('Result: ', result);


  return NextResponse.json({
    user: {
      username: "hello",
    },
  });

}
