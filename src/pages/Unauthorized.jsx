import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="unauthorized-page">
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to view this page.</p>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Unauthorized;
