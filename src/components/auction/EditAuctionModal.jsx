import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import ProductSelector from "./ProductSelector";
import {
    updateAuction,
} from "../../services/Auction";

const EditAuctionModal = ({
    auction,
    onClose,
    onUpdated,
}) => {
    const [formData, setFormData] = useState({
        // productId: "",
        startingPrice: "",
        startTime: "",
        endTime: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!auction) return;

        setFormData({
            // productId: auction.productId || "",
            startingPrice:
                auction.startingPrice || "",
            startTime:
                auction.startTime?.slice(0, 16) || "",
            endTime:
                auction.endTime?.slice(0, 16) || "",
        });
    }, [auction]);

    if (!auction) {
        return null;
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            new Date(formData.endTime) <=
            new Date(formData.startTime)
        ) {
            toast.error(
                "End time must be after start time"
            );
            return;
        }

        try {
            setLoading(true);

            await updateAuction(
                auction.id,
                {
                    // productId: Number(
                    //     formData.productId
                    // ),
                    startingPrice:
                        formData.startingPrice,
                    startTime:
                        formData.startTime,
                    endTime:
                        formData.endTime,
                }
            );

            toast.success(
                "Auction updated successfully"
            );

            onUpdated();
            onClose();

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update auction"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

                <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

                    <div>
                        <h2 className="text-xl font-semibold text-white">
                            Edit Auction
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Update your auction details
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        <X size={20} />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    {/* <ProductSelector
                        value={formData.productId}
                        onChange={(productId) =>
                            setFormData((prev) => ({
                                ...prev,
                                productId,
                            }))
                        }
                    /> */}

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">
                            Starting Price
                        </label>

                        <input
                            type="number"
                            name="startingPrice"
                            value={formData.startingPrice}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">
                            Start Time
                        </label>

                        <input
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-200">
                            End Time
                        </label>

                        <input
                            type="datetime-local"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
                        >
                            {loading
                                ? "Updating..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditAuctionModal;