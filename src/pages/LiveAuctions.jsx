import React, { useEffect, useState } from 'react';
import { getLiveAuctions } from '../api/dashboard';

const LiveAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLiveAuctions();
      setAuctions(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading live auctions...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Live Auctions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {auctions.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
            <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">Current Bid: ${item.currentBid}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAuctions;
