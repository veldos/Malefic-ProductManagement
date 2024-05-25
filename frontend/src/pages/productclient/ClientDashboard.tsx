import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';

const ClientDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/client/dashboard');
        setUser(response.data.user);
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h1>Welcome, {user.email}</h1>
          <p>Your user ID is: {user._id}</p>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
