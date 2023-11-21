// eslint-disable-next-line @typescript-eslint/no-unused-vars
import style from './aboutStyle.scss';

export default function AboutPage() {
  return (
    <main className="main">
    <div className="container">
      <div className="about-left-side">
        <h1 className="h1">WELCOME to Your Ultimate Bucket List Planner!</h1>
    <br />
    <br />
  <div className="div">
    <h4 className="h4">Our Mission:</h4>
    We're here to simplify your adventure planning! Imagine having a personal assistant that helps you gather all the essential details for your dream goals. That's what we do! Our mission is to offer you a seamless platform where you can store, organize, and access all the information needed to achieve your aspirations. No more endless searching for links, pictures, or budget details.
    <br />
    <br />
    <br />

    <h4 className="h4">What We Offer:</h4>

    One-Stop Information Hub: Collect and organize everything in one 'bucket' on our website. Whether it's a dream vacation, learning a new skill, or planning a big event, keep all your important info in one accessible place.
    Budget Friendly: We help you make a budget for each goal. Track your expenses and plan your finances to make your dreams a reality without financial stress.
    Share the Journey: Connect with friends and family by sharing your bucket. Collaborate, get input, and make your experiences even more memorable with your loved ones.

    <br />
    <br />
    <br />
    <h4 className="h4">Join Us:</h4>
    Embark on this exciting journey with us and turn your dreams into achievable plans. Let's fill those buckets with amazing experiences, one goal at a time! 🌟
    </div>
    <br />
    <br />
    <br />

  </div>
        <div className="about-right-side">
          {/* The right side will automatically have the background image */}
        </div>
      </div>
    </main>
  );
}
