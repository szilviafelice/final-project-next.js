import { sql } from './connect';

export type Bucket =  {
  id: number;
  userId: number;
  name: string;
  textDescription: string;
  date: string;
  url: string;
  imageUrl: string;
  budget: number;
  estimatedExpense: number;
  actualExpense: number;
  isShared: boolean;
};

export const createBucket = async (bucketData: {
  userId: number, name: string, textDescription: string, date: string, url: string, imageUrl: string, budget: number, estimatedExpense: number, actualExpense: number, isShared: boolean

}): Promise<Bucket | null> => {

  const [bucket] = await sql<Bucket[]>`
   INSERT INTO
      buckets (user_id, name, text_description, date, url, image_url, budget, estimated_expense, actual_expense, is_shared)
    VALUES
      (
        ${bucketData.userId},
        ${bucketData.name},
        ${bucketData.textDescription},
        ${bucketData.date},
        ${bucketData.url},
        ${bucketData.imageUrl},
        ${bucketData.budget},
        ${bucketData.estimatedExpense},
        ${bucketData.actualExpense},
        ${bucketData.isShared}
      ) RETURNING *
  `;

  return bucket;
};
