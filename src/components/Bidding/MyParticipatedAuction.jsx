
import React, { useEffect, useState } from "react";
import { Eye, Gavel } from "lucide-react";
import toast from "react-hot-toast";

import { getMyBids } from "../../services/bid";
import { BidModel } from "./BidModel";
import { AllBids } from "./AllBids";

const MyParticipatedAuction = () => {

    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedAuctionId, setSelectedAuctionId] = useState(null);
    const [showBidModal, setShowBidModal] = useState(false);
    const [showAllBidsAuctionId, setShowAllBidsAuctionId] = useState(null);

    const [showAllBidsModal, setShowAllBidsModal] = useState(false);
    // ==============================
    // FETCH PARTICIPATED AUCTIONS
    // ==============================
    useEffect(() => {

        const fetchMyBids = async () => {
            try {

                setLoading(true);

                const data = await getMyBids();

                setAuctions(data);

            } catch (error) {

                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to fetch participated auctions"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchMyBids();

    }, []);


    // ==============================
    // PLACE BID
    // ==============================
    const handlePlaceBid = (auctionId) => {
        setSelectedAuctionId(auctionId);
        setShowBidModal(true);
    };


    // ==============================
    // VIEW ALL BIDS
    // ==============================
    const handleViewBids = (auctionId) => {
        setShowAllBidsAuctionId(auctionId);
        setShowAllBidsModal(true);
    };


    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <p className="text-gray-500">
                    Loading participated auctions...
                </p>
            </div>
        );
    }


    return (
        <div className="p-6">

            {/* ==============================
                HEADER
            ============================== */}
            <div className="mb-6">

                <h1 className="text-2xl font-bold text-gray-800">
                    My Participated Auctions
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Auctions where you have placed bids
                </p>

            </div>


            {/* ==============================
                EMPTY STATE
            ============================== */}
            {auctions.length === 0 ? (

                <div className="rounded-xl border bg-white p-10 text-center">

                    <p className="text-gray-500">
                        You haven't participated in any auctions yet.
                    </p>

                </div>

            ) : (

                /* ==============================
                   AUCTION LIST
                ============================== */
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {auctions.map((auction, index) => (

                        <div
                            key={auction.id || auction.auctionId || auction.auction?.id || index}
                            className="rounded-xl border bg-white p-5 shadow-sm"
                        >

                            {/* Product */}
                            <div className="mb-4">

                                <h2 className="text-lg font-semibold text-gray-800">
                                    {auction.product?.name || "Unknown Product"}
                                </h2>

                            </div>


                            {/* Status */}
                            <div className="mb-4">

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${auction.status === "ACTIVE"
                                        ? "bg-green-100 text-green-700"
                                        : auction.status === "ENDED"
                                            ? "bg-gray-100 text-gray-600"
                                            : auction.status === "CANCELLED"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {auction.status}
                                </span>

                            </div>


                            {/* Auction Details */}
                            <div className="space-y-2 text-sm text-gray-600">

                                <div className="flex justify-between">
                                    <span>Start Time</span>
                                    <span className="font-medium text-gray-800">
                                        {new Date(
                                            auction.startTime
                                        ).toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>End Time</span>
                                    <span className="font-medium text-gray-800">
                                        {new Date(
                                            auction.endTime
                                        ).toLocaleString()}
                                    </span>
                                </div>

                            </div>


                            {/* ==============================
                                ACTION BUTTONS
                            ============================== */}
                            <div className="mt-5 flex gap-3">

                                {auction.status === "ACTIVE" && (

                                    <button
                                        onClick={() =>
                                            handlePlaceBid(auction.id)
                                        }
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        <Gavel size={17} />
                                        Place Bid
                                    </button>

                                )}


                                <button
                                    onClick={() =>
                                        handleViewBids(auction.id)
                                    }
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    <Eye size={17} />
                                    View All Bids
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}


            {/* ==============================
                BID MODAL
            ============================== */}
            {showBidModal && (

                <BidModel
                    auctionId={selectedAuctionId}
                    onClose={() => {
                        setShowBidModal(false);
                        setSelectedAuctionId(null);
                    }}
                    onBidPlaced={() => {
                        // Optional: refresh participated auctions
                    }}
                />

            )}

            {/* ==============================
                ALL BIDS MODAL
            ============================== */}
            {showAllBidsAuctionId && showAllBidsModal && (
                <AllBids
                    auctionId={showAllBidsAuctionId}
                    onClose={() => { setShowAllBidsAuctionId(null); setShowAllBidsModal(false) }}
                />
            )}

        </div>
    );
};

export default MyParticipatedAuction;
