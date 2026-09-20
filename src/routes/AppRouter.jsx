import { Routes, Route, Navigate } from 'react-router-dom';

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

import MainLayout from '../layouts/MainLayout.jsx';

import ProductManagement from '../pages/Product/ProductManagement.jsx';
import CategoryManagement from '../pages/Category/CategoryManagement.jsx';



import LiveAuctions from '../pages/LiveAuctions.jsx';
import MyBids from '../pages/MyBids.jsx';
import MyAuctions from '../pages/Auction/MyAuctions.jsx';
import CreateAuction from '../pages/CreateAuction.jsx';
import Profile from '../pages/Profile.jsx';
import AuctionDetails from '../pages/AuctionDetails.jsx';
import DashBoard from '../pages/DashBoard/DashBoard.jsx';
import ActiveAuctions from '../pages/Auction/ActiveAuction.jsx';
import MyParticipatedAuction from '../components/Bidding/MyParticipatedAuction.jsx';
// PrivateRoute removed - routes are now public

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Authenticated Routes wrapped with AppLayout */}
      <Route path="/dashboard" element={<DashBoard />} >
        <Route path="/dashboard/live" element={<LiveAuctions />} />
        <Route path="/dashboard/my-bids" element={<MyParticipatedAuction />} />
        <Route path="/dashboard/active-auctions" element={<ActiveAuctions />} />
        <Route path="/dashboard/my-auctions" element={<MyAuctions />} />
        <Route path="/dashboard/create" element={<CreateAuction />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/auction/:id" element={<AuctionDetails />} />
        <Route path="/dashboard/product-management" element={<ProductManagement />} />
        <Route path="/dashboard/categories" element={<CategoryManagement />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
