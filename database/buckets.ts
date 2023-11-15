import { sql } from './connect';

export type Bucket =  {
  id: number;
  userId: number;
  name: string;
  textDescription: string;
  date: Date;
  url: string;
  imageUrl: string;
  budget: number;
  estimatedExpense: number;
  actualExpense: number;
  isShared: boolean;
};

export const createBucket = async (bucketData: {
  userId: number, name: string, textDescription: string, date: Date, url: string, imageUrl: string, budget: number, estimatedExpense: number, actualExpense: number, isShared: boolean

}): Promise<Bucket | null> => {
  console.log("bucketData:", bucketData);

  const result = await sql<{ id: number; userId: number | null; name: string; textDescription: string | null; date: Date | null; url: string | null; imageUrl: string | null; budget: number | null; estimatedExpense: number | null; actualExpense: number | null; isShared: boolean | null; }[]>`
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

console.log("SQL result:", result);

if (result.length === 0) {
  return null;
}

// Otherwise, return the first item in the array
return result[0];
};
