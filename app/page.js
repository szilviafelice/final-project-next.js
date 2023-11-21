import './globals.scss';
import Head from 'next/head';
import React from 'react';

function Home() {
    return (
      <>
        <Head>
          <title>Landing Page</title>
        </Head>

        <div className="container">
          <div className="left-side">
            <div className="text-container">
              <h1>The ultimate Bucket list planner tool</h1>
              <h2>Collect,<br/> Save,<br/>and Share</h2>
              <p>Organize and edit Your Bucket List Goals in One Place.</p>
              <p>Your adventure plan is always at your fingertips</p>
              <p>Travel, Education, Personal Development, Adventure Sports, Culinary Experiences, the list is unlimited</p>
              <p className="footer-text">All Managed Seamlessly in One Platform.</p>
            </div>
          </div>
          <div className="right-side" />
          </div>

      </>
    );
}

export default Home;
