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

  const calculateMonthsUntilEvent = () => {
    if (!startDate) {
      return 0; // No start date means no months to calculate
    }
    const now = new Date();
    const start = new Date(startDate);
    if (start <= now) {
      return 0; // Start date is in the past
    }
    const months = (start.getFullYear() - now.getFullYear()) * 12 + start.getMonth() - now.getMonth();
    // Check if start date's day is later in the month than the current day
    if (start.getDate() > now.getDate()) {
      return months + 1;
    }
    return months;
  };
  const calculateAmountToSave = () => {
    const estimated = parseFloat(estimatedExpense) || 0;
    const actual = parseFloat(actualExpense) || 0;
    console.log(`Amount to save: ${estimated - actual}`);
    return Math.max(0, estimated - actual);
  };

  const calculateMonthlySavings = () => {
    const amountToSave = calculateAmountToSave();
    const monthsUntilEvent = calculateMonthsUntilEvent();
    console.log(`Amount to save: ${amountToSave}, Months until event: ${monthsUntilEvent}`);
    return monthsUntilEvent > 0 ? (amountToSave / monthsUntilEvent).toFixed(2) : '0.00';
  };

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
    await fetch('/api/buckets', {
      method: 'POST',
      body: JSON.stringify({
      user_id: userId,
      name: bucketName || "Default Name",
      theme: bucketTheme || "Default Theme",
      text_description: textDescription || "Default Description",
      date: bucketDate ? bucketDate.toISOString() : null,
      url: bucketUrl || "Default URL",
      image_url: imageUrl || "Default Image URL",
      budget: bucketBudget ? parseFloat(bucketBudget) : 0,
      estimated_expense: parseFloat(estimatedExpense) || 0,
      actual_expense: parseFloat(actualExpense) || 0,
      is_shared: isShared
      }),
    });

    // console.log("Sending payload:", payload);
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
      <label htmlFor="bucketName">Name your bucketlist:
      </label>
        <input
          id="bucketName"
          value={bucketName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBucketName(event.currentTarget.value)}/>
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
          rows={3}
          cols={50} />
      </label>
      <br />
      <label>
            Estimated Expense:
            <input
              type="number"
              value={estimatedExpense}
              onChange={(e) => setEstimatedExpense(e.target.value)}
            />     €
          </label>
          <label>
            Actual Expense:
            <input
              type="number"
              value={actualExpense}
              onChange={(e) => setActualExpense(e.target.value)}
            />    €
          </label>
          <p>
          Let's save up: {calculateAmountToSave().toFixed(2)} Euros
          </p>
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
        {startDate && endDate && (
          <p>
            You need to save up monthly: {calculateMonthlySavings()} Euros
          </p>
)}
      <label>
        Upload image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
        />
      </label> <br />

      <button>Create +</button>
    </form>
  );
 }
