import React from 'react';
import Link from 'next/link';

const RunReports = () => {
  return (
    <div>
      <h3>Run Reports</h3>
      <ul>
        <li>Date: Lorem Ipsum</li>
        <li>Date: Lorem Ipsum</li>
        <li>Date: Lorem Ipsum</li>
      </ul>
      <Link href="/">
        <a>
          <small>See All</small>
        </a>
      </Link>
    </div>
  );
};

export default RunReports;
