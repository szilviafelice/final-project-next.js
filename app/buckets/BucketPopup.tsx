import React from 'react';

type BucketProps = {
  bucketId: number;
  userId: number,
  name: string,
  theme: string,
  textDescription: string,
  imageUrl: string,
  estimatedExpense: number,
  actualExpense: number
};


type BucketPopupProps = {
  bucket: BucketProps;
  onClose: () => void;
  onDelete: (bucketId: number) => void;
};

const BucketPopup: React.FC<BucketPopupProps> = ({ bucket, onClose, onDelete }) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!bucket) return null;


  return (
    <div className="popup-container">
      <div className="popup">
        <h2>{bucket.name}</h2>
        <p>Description: {bucket.textDescription}</p>
        <p>Estimated Expense: {bucket.estimatedExpense}</p>
        <button onClick={() => onDelete(bucket.bucketId)}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BucketPopup;
