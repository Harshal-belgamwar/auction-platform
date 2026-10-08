import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trophy, Clock, IndianRupee, Loader2, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { useAuth } from '../../Context/AuthContext';

export default function Notification() {
    const { user, loading: authLoading } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userId = user?.id;

                if (!userId) {
                    setLoading(false);
                    return;
                }

                const response = await api.get(`/api/v1/notification/${userId}`);
                setNotifications(response.data);
            } catch (err) {
                toast.error('Failed to load notifications');
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
             fetchNotifications();
        }
    }, [user, authLoading]);


    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        }).format(date);
    };
    const formatCurrency = (amount) => {
        if (amount == null) return '₹0.00';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        }).format(amount);
    };
    return (
        <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Notifications</h1>
                        <p className="mt-1 text-sm text-slate-500">Stay updated on your auctions and bids.</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-inner">
                        <Bell size={24} />
                    </div>
                </div>
                {loading || authLoading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                    </div>
                ) : notifications.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm"
                    >
                        <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-400">
                            <Bell size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No notifications yet</h3>
                        <p className="mt-1 max-w-sm text-sm text-slate-500">
                            When auctions end or there are important updates, they will appear here.
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {notifications.map((notification, index) => (
                                <motion.div
                                    key={notification.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md sm:p-6"
                                >
                                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 transition-opacity group-hover:opacity-100" />

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                                <Trophy size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-slate-900">
                                                    Auction Ended: {notification.productTitle || 'Unknown Product'}
                                                </h3>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    {notification.winnerName ? (
                                                        <span>Won by <span className="font-medium text-slate-700">{notification.winnerName}</span></span>
                                                    ) : (
                                                        <span>No winner for this auction</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 sm:justify-end sm:gap-6">
                                            {notification.winningBidAmount != null && (
                                                <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
                                                    <IndianRupee size={16} />
                                                    {formatCurrency(notification.winningBidAmount)}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <Clock size={14} />
                                                {formatDate(notification.endTime)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
                                        {notification.sellerName && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <span className="font-medium text-slate-400">Seller:</span>
                                                <span>{notification.sellerName}</span>
                                            </div>
                                        )}
                                        {notification.auctionId && (
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Package size={14} className="text-slate-400" />
                                                <span className="font-medium text-slate-400">Auction ID:</span>
                                                <span>#{notification.auctionId}</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
