// cn utility not required in this mock API

export const getLiveAuctions = async () => {
  // Mock data for live auctions
  return [
    {
      id: '1',
      title: 'Vintage Watch',
      currentBid: 120,
      imageUrl: '/placeholder.png',
    },
    {
      id: '2',
      title: 'Antique Vase',
      currentBid: 250,
      imageUrl: '/placeholder.png',
    },
  ];
};

export const getMyBids = async (userId) => {
  // Mock data for user's bids
  return [
    {
      id: '3',
      title: 'Rare Comic Book',
      yourBid: 80,
      status: 'Winning',
    },
  ];
};

export const getMyAuctions = async (userId) => {
  // Mock data for user's own auctions
  return [
    {
      id: '4',
      title: 'Classic Car Model',
      highestBid: 500,
      endDate: '2026-12-31',
    },
  ];
};

export const getAuctionDetails = async (auctionId) => {
  // Mock detail data
  return {
    id: auctionId,
    title: 'Sample Auction',
    description: 'Detailed description of the auction item.',
    images: ['/placeholder.png'],
    currentBid: 200,
    endDate: '2026-11-30',
  };
};

// Mock API for adding a product
export const addProduct = async (product) => {
  console.log('Mock add product:', product);
  // In real app, replace with POST request
  return { success: true, product };
};

// Mock API for updating a product
export const updateProduct = async (productId, updates) => {
  console.log('Mock update product:', productId, updates);
  return { success: true, productId, updates };
};

// Mock API for deleting a product
export const deleteProduct = async (productId) => {
  console.log('Mock delete product:', productId);
  return { success: true, productId };
};

// Mock API for adding a category
export const addCategory = async (category) => {
  console.log('Mock add category:', category);
  return { success: true, category };
};
