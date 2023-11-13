import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../database/sessions';

const bucketSchema = z.object({
  userId: z.number().optional(),
  bucketName: z.string().min(3),
  bucketTheme: z.string().min(1),
  textDescription: z.string().optional(),
  bucketDate: z.string().optional(),
  bucketUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  bucketBudget: z.number().optional(),
  estimatedExpense: z.number().optional(),
  actualExpense: z.number().optional(),
  isShared: z.boolean()
});

export type CreateBucketsResponseBodyPost =
  | {
      bucket: {
        bucketName: string,
        bucketTheme: string,
        textDescription: string,
        bucketDate: string,
        bucketUrl: string,
        imageUrl: string,
        bucketBudget: number,
        estimatedExpense: number,
        actualExpense: number,
        isShared: boolean
      };
    }
  | {
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


  const newBucket = await createBucket(result.data);
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
      bucketName: newBucket.bucketName,
      bucketTheme: newBucket.bucketTheme,
      textDescription: newBucket.textDescription,
      bucketDate: newBucket.bucketDate,
      bucketUrl: newBucket.bucketUrl,
      imageUrl: newBucket.imageUrl,
      bucketBudget: newBucket.bucketBudget,
      estimatedExpense: newBucket.estimatedExpense,
      actualExpense: newBucket.actualExpense,
      isShared: newBucket.isShared},
  });
}
