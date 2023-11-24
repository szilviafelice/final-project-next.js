import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createBucket } from '../../../database/buckets';
import { getValidSessionByToken } from '../../../database/sessions';

const bucketSchema = z.object({
  userId: z.number(),
  name: z.string().min(3),
  theme: z.string().min(1),
  textDescription: z.string().optional(),
  imageUrl: z.string().optional(),
  estimatedExpense: z.number(),
  actualExpense: z.number(),
});

export type CreateBucketsResponseBodyPost =
  | {
    bucket: {
      name: string;
      theme: string | null;
      textDescription: string | null;
      imageUrl: string | null;
      estimatedExpense: number | null;
      actualExpense: number | null;
      };
    } | {
      errors: { message: string }[];
    };

    export async function POST(
      request: NextRequest,
    ): Promise<NextResponse<CreateBucketsResponseBodyPost>> {

  const body = await request.json();

  const result = bucketSchema.safeParse(body);


  if (!result.success) {
    return NextResponse.json(
      { errors: [{ message: 'Bucket creation failed' }],
    },
      { status: 400 },
    );
  }


  const sessionTokenCookie = cookies().get('sessionToken');


  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  if (!session) {
    return NextResponse.json(
      {
        errors: [{ message: 'Authentication token is invalid' }],
      },
      { status: 401 },
    );
  }


  const newBucket = await createBucket(result.data.userId, result.data.name, result.data.theme, result.data.textDescription ?? '', result.data.imageUrl ?? '', result.data.estimatedExpense,
    result.data.actualExpense);

    if (!newBucket) {
    return NextResponse.json(
      {
        errors: [{ message: 'Bucket creation failed' }],
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    bucket: {
      name: newBucket.name,
      theme: newBucket.theme ?? null, // Ha theme undefined, akkor null legyen
      textDescription: newBucket.textDescription ?? null, // Ha textDescription undefined, akkor null legyen
      imageUrl: newBucket.imageUrl ?? null, // Ha imageUrl undefined, akkor null legyen
      estimatedExpense: newBucket.estimatedExpense ?? null, // Ha estimatedExpense undefined, akkor null legyen
      actualExpense: newBucket.actualExpense ?? null
    },
  });
}
