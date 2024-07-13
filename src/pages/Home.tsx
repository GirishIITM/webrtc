import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <Link className="link" to="/user1">User 1</Link>
      <Link className="link" to="/user2">User 2</Link>
      <div className="instructions">
        <p>To start a WebRTC connection:</p>
        <ol>
          <li>Go to <Link className="link" to="/user1">User 1</Link> page and start the camera.</li>
          <li>Create an offer and copy it.</li>
          <li>Go to <Link className="link" to="/user2">User 2</Link> page and start the camera.</li>
          <li>Paste the offer and create an answer. Copy the answer.</li>
          <li>Go back to <Link className="link" to="/user1">User 1</Link> page and paste the answer.</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;

