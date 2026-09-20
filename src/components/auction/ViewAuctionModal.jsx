
import React, { useEffect, useState } from "react";
import { X, Calendar, Clock, User, Package, Trophy } from "lucide-react";
import { toast } from "react-hot-toast";
import { getAuction } from "../../services/Auction";

const ViewAuctionModal = ({ isOpen, onClose, auctionId }) => {
    const [auction, setAuction] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !auctionId) return;

        const fetchAuction = async () => {
            try {
                setLoading(true);

                const data = await getAuction(auctionId);

                setAuction(data);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load auction"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();
    }, [isOpen, auctionId]);

    if (!isOpen) {
        return null;
    }

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "UPCOMING":
                return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

            case "ACTIVE":
                return "bg-green-500/10 text-green-400 border-green-500/20";

            case "ENDED":
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";

            case "CANCELLED":
                return "bg-red-500/10 text-red-400 border-red-500/20";

            default:
                return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">

                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Auction Details
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            View complete auction information
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center px-6 py-16">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-500" />
                    </div>
                ) : auction ? (
                    <div className="space-y-6 p-6">

                        {auction.product && (
                            <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

                                <div className="mb-4 flex items-center gap-2">
                                    <Package
                                        size={20}
                                        className="text-indigo-400"
                                    />

                                    <h3 className="text-lg font-semibold text-white">
                                        Product Information
                                    </h3>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">

                                    {auction.product.imageUrls && Object.values(auction.product.imageUrls).length > 0 && (
                                        <div className="md:col-span-2">

                                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                {Object.values(auction.product.imageUrls).map(
                                                    (image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image}
                                                            alt={
                                                                auction.product.name ||
                                                                "Product"
                                                            }
                                                            className="h-40 w-full rounded-xl object-cover"
                                                        />
                                                    )
                                                )}
                                            </div>

                                        </div>
                                    )}

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Product Name
                                        </p>

                                        <p className="mt-1 text-sm text-white">
                                            {auction.product.name || "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Category
                                        </p>

                                        <p className="mt-1 text-sm text-white">
                                            {auction.product.categoryName || "-"}
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Description
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-slate-300">
                                            {auction.product.description || "-"}
                                        </p>
                                    </div>

                                    {/* <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Product Status
                                        </p>

                                        <p className="mt-1 text-sm text-white">
                                            {auction.product.status || "-"}
                                        </p>
                                    </div> */}

                                    {/* <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                            Product ID
                                        </p>

                                        <p className="mt-1 text-sm text-white">
                                            {auction.product.id || "-"}
                                        </p>
                                    </div> */}

                                </div>
                            </div>
                        )}

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

                            <div className="mb-4 flex items-center gap-2">
                                <Trophy
                                    size={20}
                                    className="text-indigo-400"
                                />

                                <h3 className="text-lg font-semibold text-white">
                                    Auction Information
                                </h3>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Auction ID
                                    </p>

                                    <p className="mt-1 text-sm text-white">
                                        #{auction.id}
                                    </p>
                                </div>

                                {/* <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Seller ID
                                    </p>

                                    <div className="mt-1 flex items-center gap-2 text-sm text-white">
                                        <User size={16} />
                                        {auction.sellerId}
                                    </div>
                                </div> */}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Status
                                    </p>

                                    <span
                                        className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(
                                            auction.status
                                        )}`}
                                    >
                                        {auction.status}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Winner ID
                                    </p>

                                    <p className="mt-1 text-sm text-white">
                                        {auction.winnerId || "Not decided"}
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

                            <div className="mb-4 flex items-center gap-2">
                                <Trophy
                                    size={20}
                                    className="text-indigo-400"
                                />

                                <h3 className="text-lg font-semibold text-white">
                                    Pricing
                                </h3>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Starting Price
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-white">
                                        ₹{auction.startingPrice}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Current Price
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-indigo-400">
                                        ₹{auction.currentPrice}
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

                            <div className="mb-4 flex items-center gap-2">
                                <Calendar
                                    size={20}
                                    className="text-indigo-400"
                                />

                                <h3 className="text-lg font-semibold text-white">
                                    Auction Schedule
                                </h3>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Start Time
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-sm text-white">
                                        <Clock size={16} />
                                        {formatDate(auction.startTime)}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        End Time
                                    </p>

                                    <div className="mt-2 flex items-center gap-2 text-sm text-white">
                                        <Clock size={16} />
                                        {formatDate(auction.endTime)}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Created At
                                    </p>

                                    <p className="mt-1 text-sm text-slate-300">
                                        {formatDate(auction.createdAt)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Last Updated
                                    </p>

                                    <p className="mt-1 text-sm text-slate-300">
                                        {formatDate(auction.updatedAt)}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="px-6 py-16 text-center text-sm text-slate-400">
                        Auction not found
                    </div>
                )}

                <div className="flex justify-end border-t border-slate-800 px-6 py-4">

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                        Close
                    </button>

                </div>

            </div>
        </div>
    );
};

export default ViewAuctionModal;

