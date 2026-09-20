import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Gavel,
  Package,
  Tag,
  Trophy,
  CreditCard,
  Bell,
  User,
  LogOut,
  Plus,
  FolderTree
} from 'lucide-react';
import { cn } from '../../utils/cn';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Active Auctions', href: '/dashboard/active-auctions', icon: Gavel },
  { name: 'My Auctions', href: '/dashboard/my-auctions', icon: Package },
  { name: 'My Bids', href: '/dashboard/my-bids', icon: Tag },
  { name: 'Won Auctions', href: '/dashboard/won-auctions', icon: Trophy },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Products', href: '/dashboard/product-management', icon: Plus },
  { name: 'Categories', href: '/dashboard/categories', icon: FolderTree },
];

export default function Sidebar({ isOpen = false, setIsOpen = () => { } }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/api/v1/auth/logout');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    } finally {

      navigate('/login');
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:flex lg:flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-2">
            <Gavel className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">BidVerse</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
          <ul className="flex flex-1 flex-col gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                    )} />
                    {item.name}
                  </Link>
                </li>
              );
            })}

            <li className="mt-auto border-2  w-full p-2">
              <button
                onClick={handleLogout}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-red-600 transition-colors" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
