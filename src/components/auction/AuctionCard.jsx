import {
  Eye,
  Pencil,
  Trash2,
  Clock,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast"
import api from "../../api/axios"

const onDelete = async (auction) => {
  const confirmed = window.confirm(`Are you sure you want to delete auction #${auction.id}?`);

  if (!confirmed) {
    return;
  }

  try {
    await api.delete(
      `/api/v1/auctions/${auction.id}`
    );

    toast.success(
      "Auction deleted successfully"
    );

    loadAuctions();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete auction"
    );
  }


}

const AuctionCard = ({
  auction,
  onView,
  onEdit,
  onCancel
}) => {

  const getStatusStyle = () => {
    switch (auction.status) {
      case "UPCOMING":
        return "bg-blue-500/10 text-blue-400";

      case "ACTIVE":
        return "bg-green-500/10 text-green-400";

      case "ENDED":
        return "bg-slate-500/10 text-slate-400";

      case "CANCELLED":
        return "bg-red-500/10 text-red-400";

      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  const canEdit =
    auction.status === "UPCOMING";

  const canCancel =
    auction.status === "UPCOMING";

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="p-5">

        <div className="mb-5 flex items-start justify-between gap-3">

          <div>
            <h3 className="text-lg font-semibold text-white">
              {auction.product.name ||
                `Product #${auction.productId}`}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Auction #{auction.id}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle()}`}
          >
            {auction.status}
          </span>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <p className="text-xs text-slate-500">
              Starting Price
            </p>

            <p className="mt-1 font-semibold text-white">
              ₹{auction.startingPrice}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Current Price
            </p>

            <p className="mt-1 font-semibold text-white">
              ₹{auction.currentPrice ??
                auction.startingPrice}
            </p>
          </div>

        </div>

        <div className="mt-5 space-y-2">

          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              Start
            </span>

            <span className="text-slate-300">
              {new Date(
                auction.startTime
              ).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <Clock size={15} />
              End
            </span>

            <span className="text-slate-300">
              {new Date(
                auction.endTime
              ).toLocaleString()}
            </span>
          </div>

        </div>

      </div>

      <div className="grid grid-cols-4 border-t border-slate-800">

        <button
          onClick={() => onView(auction)}
          className="flex items-center justify-center gap-2 p-4 text-sm text-slate-300 transition hover:bg-slate-800"
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={() =>
            canEdit && onEdit(auction)
          }
          disabled={!canEdit}
          className="flex items-center justify-center gap-2 border-l border-slate-800 p-4 text-sm text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:text-slate-600"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() =>
            canCancel && onCancel(auction)
          }
          disabled={!canCancel}
          className="flex items-center justify-center gap-2 border-x border-slate-800 p-4 text-sm text-orange-400 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:text-slate-600"
        >
          <XCircle size={16} />
          Cancel
        </button>

        <button
          onClick={() => onDelete(auction)}
          className="flex items-center justify-center gap-2 p-4 text-sm text-red-400 transition hover:bg-slate-800"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
};

export default AuctionCard;