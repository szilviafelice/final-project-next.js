'use client';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

export default function CreateBucketForm({ userId }: { userId: number }) {
  const [bucketName, setBucketName] = useState<string>("");
  const [bucketTheme, setBucketTheme] = useState<string>("");
  const [textDescription, setTextDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [estimatedExpense, setEstimatedExpense] = useState('');
  const [actualExpense, setActualExpense] = useState('');
  // const [isShared, setIsShared] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


  const calculateMonthsUntilEvent = () => {
    if (!startDate) {
      return 0;
    }
    const now = new Date();
    const start = new Date(startDate);
    if (start <= now) {
      return 0;
    }
    const months = (start.getFullYear() - now.getFullYear()) * 12 + start.getMonth() - now.getMonth();

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
    console.log("handleCreateBucket function triggered");
    const payload = {
      userId,
      name: bucketName || "Default Name",
      theme: bucketTheme || "Default Theme",
      textDescription: textDescription || "Default Description",
      imageUrl: imageUrl || "Default Image URL",
      estimatedExpense: parseFloat(estimatedExpense) || 0,
      actualExpense: parseFloat(actualExpense) || 0,
    };
    console.log("Payload:", payload);
      try {
        const response = await fetch('api/buckets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error from server:', errorData);
          throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        console.log("Sending payload:", payload);
        const data = await response.json();
        console.log("Bucket list created successfully:", data);

        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
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
