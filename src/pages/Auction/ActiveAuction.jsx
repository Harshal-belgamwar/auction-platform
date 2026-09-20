
import React, { useEffect, useState } from "react";
import {
    Clock,
    Package,
    Gavel,
    Calendar,
    X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import { useAuth } from "../../Context/AuthContext";
import { BidModel } from "../../components/Bidding/BidModel";

const ActiveAuction = () => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState({});


    // For BidModal
    const [selectedAuctionId, setSelectedAuctionId] = useState(null);
    const [selectedAuctionAmount, setSelectedAuctionAmount] = useState(null);
    const [showBidModal, setShowBidModal] = useState(false);


    useEffect(() => {
        fetchActiveAuctions();

        const eventSource = new EventSource(
            `${api.defaults.baseURL}/api/v1/auctions/active/events`,
            {
                withCredentials: true
            }
        );

        eventSource.addEventListener(
            "auction-list-changed",
            () => {
                fetchActiveAuctions();
            }
        );

        eventSource.onerror = (error) => {
            console.error("SSE connection error:", error);
        };

        return () => {
            eventSource.close();
        };


    }, []);


    useEffect(() => {
        const updateTimers = () => {
            const updatedTimers = {};

            auctions.forEach((auction) => {
                if (auction.status === "ACTIVE") {
                    const remaining =
                        new Date(auction.endTime).getTime() - Date.now();

                    updatedTimers[auction.id] = Math.max(0, remaining);
                }
            });

            setTimeLeft(updatedTimers);
        };

        updateTimers();

        const timer = setInterval(updateTimers, 1000);

        return () => clearInterval(timer);
    }, [auctions]);

    const fetchActiveAuctions = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/api/v1/auctions"
            );

            setAuctions(response.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load active auctions"
            );
        } finally {
            setLoading(false);
        }
    };

    const { user } = useAuth();

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };
    const getTimeRemaining = (milliseconds) => {
        if (milliseconds <= 0) {
            return "Auction ended";
        }

        const totalSeconds = Math.floor(milliseconds / 1000);

        const days = Math.floor(totalSeconds / 86400);

        const hours = Math.floor(
            (totalSeconds % 86400) / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const seconds = totalSeconds % 60;

        if (days > 0) {
            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        }

        return `${minutes}m ${seconds}s`;
    };

    const handleBid = (auction) => {
        if (auction.sellerId === user?.id) {
            toast.error(
                "You cannot bid on your own auction"
            );
            return;
        }

        setSelectedAuctionId(auction.id);
        setSelectedAuctionAmount(auction.currentPrice);
        setShowBidModal(true);

    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-2xl font-semibold text-white">
                    Active Auctions
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Browse and bid on currently active auctions
                </p>
            </div>

            {auctions.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

                    <Package
                        size={42}
                        className="mx-auto text-slate-600"
                    />

                    <h3 className="mt-4 text-lg font-medium text-white">
                        No active auctions
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                        There are no active auctions at the moment.
                    </p>

                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {auctions.map((auction) => {
                        const isSeller =
                            auction.sellerId === user?.id;

                        return (
                            <div
                                key={auction.id}
                                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition hover:border-slate-700"
                            >

                                <div className="relative">

                                    {auction.product?.imageUrls?.length > 0 ? (
                                        <img
                                            src={
                                                auction.product
                                                    .imageUrls[0]
                                            }
                                            alt={
                                                auction.product
                                                    ?.name ||
                                                "Product"
                                            }
                                            className="h-56 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-56 items-center justify-center bg-slate-800">
                                            <Package
                                                size={48}
                                                className="text-slate-600"
                                            />
                                        </div>
                                    )}

                                    <div className="absolute left-4 top-4 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400 backdrop-blur-sm">
                                        ACTIVE
                                    </div>

                                </div>

                                <div className="space-y-5 p-5">

                                    <div>
                                        <div className="flex items-start justify-between gap-3">

                                            <h2 className="text-lg font-semibold text-white">
                                                {auction.product?.name ||
                                                    "Unnamed Product"}
                                            </h2>

                                            {auction.product
                                                ?.categoryName && (
                                                    <span className="shrink-0 rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                                                        {
                                                            auction.product
                                                                .categoryName
                                                        }
                                                    </span>
                                                )}

                                        </div>

                                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                                            {auction.product
                                                ?.description ||
                                                "No description available"}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">

                                        <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                                            <p className="text-xs text-slate-500">
                                                Starting Price
                                            </p>

                                            <p className="mt-1 font-medium text-white">
                                                ₹
                                                {
                                                    auction.startingPrice
                                                }
                                            </p>
                                        </div>

                                        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-3">
                                            <p className="text-xs text-slate-500">
                                                Current Price
                                            </p>

                                            <p className="mt-1 font-semibold text-indigo-400">
                                                ₹
                                                {
                                                    auction.currentPrice
                                                }
                                            </p>
                                        </div>

                                    </div>

                                    <div className="space-y-3">

                                        <div className="flex items-center gap-3 text-sm">
                                            <Calendar
                                                size={17}
                                                className="text-slate-500"
                                            />

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Started
                                                </p>

                                                <p className="text-slate-300">
                                                    {formatDate(
                                                        auction.startTime
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm">
                                            <Clock
                                                size={17}
                                                className="text-slate-500"
                                            />

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Ends
                                                </p>

                                                <p className="text-slate-300">
                                                    {formatDate(
                                                        auction.endTime
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        {auction.status === "ACTIVE" && (
                                            <div className="flex items-center gap-3 text-sm">
                                                <Clock
                                                    size={17}
                                                    className="text-indigo-400"
                                                />

                                                <div>
                                                    <p className="text-xs text-slate-500">
                                                        Time Remaining
                                                    </p>

                                                    <p className="font-medium text-indigo-400">
                                                        {getTimeRemaining(
                                                            timeLeft[auction.id] || 0
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {isSeller ? (
                                        <div className="flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-400">
                                            <Package
                                                size={17}
                                                className="mr-2"
                                            />
                                            Your Auction
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleBid(
                                                    auction
                                                )
                                            }
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
                                        >
                                            <Gavel size={18} />
                                            Place Bid
                                        </button>
                                    )}

                                </div>
                            </div>
                        );
                    })}
                    {showBidModal && selectedAuctionId && (
                        <BidModel
                            auctionId={selectedAuctionId}
                            auctionCurrentAmount={selectedAuctionAmount}
                            onClose={() => {
                                setShowBidModal(false);
                                setSelectedAuctionId(null);
                                setSelectedAuctionAmount(null);
                            }}
                            onBidPlaced={() => {
                                fetchActiveAuctions();
                            }}
                        />
                    )}

                </div>
            )}

        </div>
    );
};

export default ActiveAuction;
