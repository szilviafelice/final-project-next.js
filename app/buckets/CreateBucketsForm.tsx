'use client';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

export default function CreateBucketForm({ userId }: { userId: number }) {
  const [bucketName, setBucketName] = useState('');
  const [bucketTheme, setBucketTheme] = useState('');
  const [textDescription, setTextDescription] = useState('');
  const [bucketDate, setBucketDate] = useState<Date | null>(new Date());
  const [bucketUrl, setBucketUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bucketBudget, setBucketBudget] = useState('');
  const [estimatedExpense, setEstimatedExpense] = useState('');
  const [actualExpense, setActualExpense] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


  const router = useRouter();

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('File upload failed');
        };

        const data = await response.json();
        setImageUrl(data.imageUrl);

      } catch (error) {
        console.error('Upload error:', error);
      }

      console.log("Selected file:", file);
    }
  };



  async function handleCreateBucket() {
    await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
      user_id: userId,
      name: bucketName,
      theme: bucketTheme,
      text_description: textDescription,
      date: bucketDate,
      url: bucketUrl,
      image_url: imageUrl,
      budget: bucketBudget,
      estimated_expense: estimatedExpense,
      actual_expense: actualExpense,
      is_shared: isShared
      }),
    });
    router.refresh();


      setBucketName('');
      setBucketTheme('');
      setTextDescription('');
      setBucketDate(null);
      setBucketUrl('');
      setImageUrl('');
      setBucketBudget('');
      setEstimatedExpense('');
      setActualExpense('');
      setIsShared(false);
  }

  return (
    <form onSubmit={async (event) => {
        event.preventDefault();
        await handleCreateBucket();
      }}
    >
      <label>
        Name your bucket:
        <input
          value={bucketName}
          onChange={(event) => setBucketName(event.currentTarget.value)} />
      </label>
      <br />
      <label>
       Theme:
        <select value={bucketTheme} onChange={(event) => setBucketTheme(event.target.value)}>
          <option value="">Select a Theme</option>
          <option value="travel">Travel</option>
          <option value="experience">Experience</option>
          <option value="education">Education</option>
          <option value="family">Family</option>
          <option value="finances">Finances</option>
          </select>
      </label>
      <br />
      <label>
        The plan:
        <textarea
          value={textDescription}
          onChange={(event) => setTextDescription(event.currentTarget.value)}
          rows={4}
          cols={50} />
      </label>
      <br />
      <label htmlFor="startDate">From:</label>
        <ReactDatePicker
          id="startDate"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          isClearable
        />

      <label htmlFor="endDate">Till:</label>
        <ReactDatePicker
          id="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          isClearable
        />
      <br />
      <label>
        Upload image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
        />
      </label>
      <br />
      <button>Create +</button>
    </form>
  );
 }
