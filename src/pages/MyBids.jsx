import React, { useEffect, useState } from 'react';
import { getMyBids } from '../api/dashboard';
import { useAuth } from '../hooks/useAuth';

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // assume hook provides user info

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getMyBids(user.id);
        setBids(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  if (loading) return <div className="p-8">Loading your bids...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Bids</h2>
      {bids.length === 0 ? (
        <p className="text-gray-600">You have not placed any bids yet.</p>
      ) : (
        <ul className="space-y-4">
          {bids.map((bid) => (
            <li key={bid.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xl font-semibold">{bid.title}</h3>
              <p>Your Bid: ${bid.yourBid}</p>
              <p>Status: {bid.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBids;
