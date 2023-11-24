import { cache } from 'react';
import { Bucket } from '../migrations/00002-createTableBuckets';
import { sql } from './connect';

export const createBucket = cache(async (
  userId: number,
  name: string,
  theme: string,
  textDescription: string,
  imageUrl: string,
  estimatedExpense: number,
  actualExpense: number
) => {
  const [bucket] = await sql<{ id: number; userId: number | null; name: string; textDescription: string | null; imageUrl: string | null; estimatedExpense: number | null; actualExpense: number | null; theme: string | null; }[]>`
    INSERT INTO
      buckets (
        user_id,
        name,
        theme,
        text_description,
        image_url,
        estimated_expense,
        actual_expense
      )
    VALUES
      (
        ${userId},
        ${name},
        ${theme},
        ${textDescription},
        ${imageUrl},
        ${estimatedExpense},
        ${actualExpense}
      ) RETURNING *
  `;

  return bucket;
});
