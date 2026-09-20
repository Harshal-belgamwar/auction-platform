
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";

import {
    getCurrentBid,
    placeBid
} from "../../services/bid";

export const BidModel = ({ auctionId, auctionCurrentAmount, onClose, onBidPlaced }) => {

    const [currentBid, setCurrentBid] = useState(auctionCurrentAmount || null);
    const [bidAmount, setBidAmount] = useState("");
    const [loading, setLoading] = useState(true);
    const [placingBid, setPlacingBid] = useState(false);

    console.log(auctionId, auctionCurrentAmount);
    // ==============================
    // GET CURRENT BID
    // ==============================
    useEffect(() => {

        const fetchCurrentBid = async () => {
            try {
                setLoading(true);

                const data = await getCurrentBid(auctionId);

                setCurrentBid(data || auctionCurrentAmount);

            } catch (error) {
                console.error(error);

                toast.error(
                    error.response?.data?.message ||
                    "Failed to get current bid"
                );
            } finally {
                setLoading(false);
            }
        };

        if (auctionId) {
            fetchCurrentBid();
        }

    }, [auctionId, auctionCurrentAmount]);


    // ==============================
    // PLACE BID
    // ==============================
    const handlePlaceBid = async (e) => {

        e.preventDefault();

        if (!bidAmount || Number(bidAmount) <= 0) {
            toast.error("Enter a valid bid amount");
            return;
        }

        if (
            currentBid !== null &&
            Number(bidAmount) <= Number(currentBid)
        ) {
            toast.error(
                `Bid must be greater than ₹${currentBid}`
            );
            return;
        }

        try {

            setPlacingBid(true);


            await placeBid({
                auctionId: auctionId,
                amount: bidAmount
                // currAmount: currentBid
            });

            toast.success("Bid placed successfully");

            if (onBidPlaced) {
                onBidPlaced();
            }

            onClose();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to place bid"
            );

        } finally {
            setPlacingBid(false);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

                {/* ==============================
                    HEADER
                ============================== */}
                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Place Bid
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* ==============================
                    FORM
                ============================== */}
                <form
                    onSubmit={handlePlaceBid}
                    className="space-y-5 px-6 py-6"
                >



                    {/* Current Bid */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Current Bid (₹)
                        </label>

                        <div className="w-full rounded-lg border bg-gray-50 px-3 py-2 font-semibold text-gray-800">
                            {loading
                                ? "Loading..."
                                : currentBid !== null
                                    ? `₹${currentBid}`
                                    : "No bid yet"
                            }
                        </div>
                    </div>


                    {/* Bid Amount */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Your Bid Amount (₹)
                        </label>

                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={bidAmount}
                            onChange={(e) =>
                                setBidAmount(e.target.value)
                            }
                            placeholder="Enter bid amount"
                            disabled={loading || placingBid}
                            className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
                        />

                        {currentBid !== null && (
                            <p className="mt-1 text-xs text-gray-500">
                                Enter an amount greater than ₹{currentBid}
                            </p>
                        )}
                    </div>


                    {/* ==============================
                        BUTTONS
                    ============================== */}
                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={placingBid}
                            className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                loading ||
                                placingBid ||
                                !bidAmount
                            }
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {placingBid
                                ? "Placing..."
                                : "Place Bid"
                            }
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};
