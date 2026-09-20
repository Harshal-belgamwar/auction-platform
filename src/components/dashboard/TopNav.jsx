import { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function TopNav({ setSidebarOpen }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await dashboardApi.getMyNotifications();
      const unread = data.filter(n => !n.read).length;
      setUnreadCount(unread);
    };
    fetchNotifications();
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Try to get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"User"}');

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-slate-700 lg:hidden hover:bg-slate-100 rounded-md transition-colors"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-slate-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-slate-900 bg-transparent placeholder:text-slate-400 focus:ring-0 sm:text-sm"
            placeholder="Search auctions, users, or items..."
            type="search"
            name="search"
          />
        </form>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Link
            to="/dashboard/notifications"
            className="relative -m-2.5 p-2.5 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            )}
          </Link>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5 hover:bg-slate-50 rounded-full transition-colors"
              id="user-menu-button"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 border border-indigo-200">
                <UserIcon className="h-4 w-4" />
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-slate-900" aria-hidden="true">
                  {user?.name || 'My Profile'}
                </span>
              </span>
            </button>
            
            {/* Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-slate-900/5 focus:outline-none">
                <Link
                  to="/dashboard/profile"
                  onClick={() => setProfileOpen(false)}
                  className="block px-3 py-1 text-sm leading-6 text-slate-900 hover:bg-slate-50"
                >
                  Your profile
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                  }}
                  className="block w-full text-left px-3 py-1 text-sm leading-6 text-red-600 hover:bg-slate-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
