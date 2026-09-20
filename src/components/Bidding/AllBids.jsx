import React, { useEffect, useState } from "react";
import { X, History, User, Clock, IndianRupee } from "lucide-react";
import toast from "react-hot-toast";
import { getAuctionBids } from "../../services/bid";

export const AllBids = ({ auctionId, onClose }) => {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                setLoading(true);
                const data = await getAuctionBids(auctionId);
                setBids(data);
            } catch (error) {
                console.error(error);
                toast.error(
                    error.response?.data?.message || "Failed to load bids"
                );
            } finally {
                setLoading(false);
            }
        };

        if (auctionId) {
            fetchBids();
        }
    }, [auctionId]);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-700/50 bg-slate-800/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-400">
                            <History size={20} />
                        </div>
                        <h2 className="text-xl font-semibold text-white">
                            Auction Bids History
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-slate-800 p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {loading ? (
                        <div className="flex h-40 items-center justify-center">
                            <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
                        </div>
                    ) : bids.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-800/20 py-12">
                            <History size={48} className="text-slate-600 mb-4" />
                            <h3 className="text-lg font-medium text-slate-300">No Bids Yet</h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Be the first one to place a bid on this auction!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bids.map((bid, index) => (
                                <div
                                    key={bid.id || index}
                                    className={`group flex items-center justify-between rounded-xl border p-4 transition-all hover:bg-slate-800/50 ${index === 0
                                            ? "border-green-500/30 bg-green-500/5"
                                            : "border-slate-800 bg-slate-900"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${index === 0
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-slate-800 text-slate-400"
                                            }`}>
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <User size={14} className="text-slate-500" />
                                                <span className={`font-medium ${index === 0 ? "text-green-400" : "text-slate-300"
                                                    }`}>
                                                    {bid.bidderName || "Anonymous"}
                                                </span>
                                            </div>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                                <Clock size={12} />
                                                <span>{formatDate(bid.bidTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-500 mb-1">Bid Amount</div>
                                        <div className={`flex items-center justify-end font-semibold ${index === 0 ? "text-green-400 text-lg" : "text-white"
                                            }`}>
                                            <IndianRupee size={index === 0 ? 16 : 14} className="mr-1" />
                                            {bid.bidAmount?.toLocaleString("en-IN") || "0"}
                                        </div>
                                        {index === 0 && (
                                            <span className="mt-1 inline-block rounded border border-green-500/20 bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400 uppercase tracking-wider">
                                                Highest Bid
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllBids;
