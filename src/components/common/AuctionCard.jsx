import { Link } from 'react-router-dom';

export default function AuctionCard({ auction }) {
  const { id, title, description, image, currentBid, endTime } = auction;
  const timeRemaining = () => {
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return 'Ended';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="glass-card overflow-hidden rounded-xl border border-surface-800 bg-surface-900 p-4 shadow-lg transition-transform hover:-translate-y-1">
      <img src={image} alt={title} className="mb-3 h-40 w-full object-cover rounded" />
      <h2 className="mb-1 text-lg font-semibold text-surface-50">{title}</h2>
      <p className="mb-2 text-sm text-surface-400">{description}</p>
      <div className="flex items-center justify-between text-sm text-surface-300">
        <span>Bid: ${currentBid}</span>
        <span>{timeRemaining()}</span>
      </div>
      <Link to={`/auction/${id}`} className="mt-3 block text-center text-accent-400 hover:underline">
        View Details
      </Link>
    </div>
  );
}
