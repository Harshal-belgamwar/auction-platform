import api from "../api/axios";




// ==============================
// PLACE BID
// ==============================
export const placeBid = async (bidRequest) => {
    const response = await api.post(
        "/api/v1/bidding",
        bidRequest
    );

    return response.data;
};


// ==============================
// GET CURRENT BID
// ==============================
export const getCurrentBid = async (auctionId) => {
    const response = await api.get(
        `/api/v1/bidding/${auctionId}/current`
    );

    return response.data;
};


// ==============================
// GET ALL BIDS FOR AUCTION
// ==============================
export const getAuctionBids = async (auctionId) => {
    const response = await api.get(
        `/api/v1/bidding/${auctionId}/bids`
    );

    return response.data;
};


// ==============================
// GET MY PARTICIPATED AUCTIONS
// ==============================
export const getMyBids = async () => {
    const response = await api.get(
        "/api/v1/bidding/my-bids"
    );

    return response.data;
};

