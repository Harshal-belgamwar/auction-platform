import api from "../api/axios.js";

export const createAuction = async (auctionData) => {
    const response = await api.post(
        "/api/v1/auctions",
        auctionData
    );

    return response.data;
};

export const getSellerAuctions = async () => {
    const response = await api.get(
        "/api/v1/auctions/my"
    );

    return response.data;
};

export const getAuction = async (auctionId) => {
    const response = await api.get(
        `/api/v1/auctions/${auctionId}`
    );

    return response.data;
};

export const updateAuction = async (
    auctionId,
    auctionData
) => {
    const response = await api.put(
        `/api/v1/auctions/${auctionId}`,
        auctionData
    );

    return response.data;
};

export const cancelAuction = async (auctionId) => {
    await api.delete(
        `/api/v1/auctions/${auctionId}`
    );
};

