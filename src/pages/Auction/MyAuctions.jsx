import { useEffect, useState } from "react";
import { Plus, Gavel } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../api/axios.js";

import {
    getSellerAuctions,
    cancelAuction

} from "../../services/Auction.js"

import CreateAuctionModal from "../../components/auction/CreateAuctionModal.jsx";
import EditAuctionModal from "../../components/auction/EditAuctionModal.jsx";
import AuctionCard from "../../components/auction/AuctionCard.jsx";
import ViewAuctionModal from "../../components/auction/ViewAuctionModal.jsx";

const MyAuctions = () => {
    const [auctions, setAuctions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showCreateModal, setShowCreateModal] =
        useState(false);

    const [selectedAuction, setSelectedAuction] =
        useState(null);

    useEffect(() => {
        loadAuctions();

        const eventSource = new EventSource(
            `${api.defaults.baseURL}/api/v1/auctions/seller/events`,
            {
                withCredentials: true
            }
        );

        eventSource.addEventListener("auction-status", (event) => {

            const updatedAuction = JSON.parse(event.data);

            setAuctions((prevAuctions) =>
                prevAuctions.map((auction) =>
                    auction.id === updatedAuction.auctionId
                        ? {
                            ...auction,
                            status: updatedAuction.status
                        }
                        : auction
                )
            );
        });

        eventSource.onerror = (error) => {
            console.error("SSE connection error:", error);
        };

        return () => {
            eventSource.close();
        };


    }, []);

    const loadAuctions = async () => {
        try {
            setLoading(true);

            const data = await getSellerAuctions();

            setAuctions(data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load auctions"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (auction) => {
        const confirmed = window.confirm(
            `Are you sure you want to cancel auction #${auction.id}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await cancelAuction(auction.id);

            toast.success(
                "Auction cancelled successfully"
            );

            loadAuctions();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to cancel auction"
            );
        }
    };



    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedAuctionId, setSelectedAuctionId] = useState(null);

    const handleView = (auction) => {
        setSelectedAuctionId(auction.id);
        setIsViewModalOpen(true);
    };



    return (
        <div className="min-h-full bg-slate-950 p-6 text-white">

            <div className="mx-auto max-w-7xl">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Auctions
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Manage auctions created by you
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setShowCreateModal(true)
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium transition hover:bg-indigo-500"
                    >
                        <Plus size={18} />
                        Create Auction
                    </button>

                </div>

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <p className="text-slate-400">
                            Loading auctions...
                        </p>
                    </div>
                ) : auctions.length === 0 ? (

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

                        <Gavel
                            size={45}
                            className="mx-auto mb-4 text-slate-600"
                        />

                        <h2 className="text-xl font-semibold">
                            No auctions yet
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Create your first auction to get started.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {auctions.map((auction) => (
                            <AuctionCard
                                key={auction.id}
                                auction={auction}
                                onView={handleView}
                                onEdit={setSelectedAuction}
                                onCancel={handleCancel}

                            />
                        ))}

                    </div>

                )}

            </div>

            <CreateAuctionModal
                isOpen={showCreateModal}
                onClose={() =>
                    setShowCreateModal(false)
                }
                onCreated={loadAuctions}
            />

            <EditAuctionModal
                auction={selectedAuction}
                onClose={() =>
                    setSelectedAuction(null)
                }
                onUpdated={loadAuctions}
            />

            <ViewAuctionModal
                isOpen={isViewModalOpen}
                onClose={() => {
                    setIsViewModalOpen(false);
                    setSelectedAuctionId(null);
                }}
                auctionId={selectedAuctionId}
            />

        </div>
    );
};

export default MyAuctions;