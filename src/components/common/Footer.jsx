import { Gavel, Globe, MessageCircle, Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-6 flex items-center gap-3 text-surface-50 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-surface-950 transition-transform group-hover:scale-105">
                <Gavel size={20} />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">BidVerse</span>
            </Link>
            <p className="mb-6 text-sm leading-6 text-surface-400">
              The premium online auction marketplace where you can discover rare collectibles, electronics, vehicles, and exclusive items safely.
            </p>
            <div className="flex gap-4 text-surface-500">
              <a href="#" className="hover:text-accent-400 transition-colors"><Globe size={20} /></a>
              <a href="#" className="hover:text-accent-400 transition-colors"><MessageCircle size={20} /></a>
              <a href="#" className="hover:text-accent-400 transition-colors"><Share2 size={20} /></a>
              <a href="#" className="hover:text-accent-400 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-surface-100">Explore</h4>
            <ul className="space-y-4 text-sm text-surface-400">
              <li><Link to="/auctions" className="transition-colors hover:text-accent-400">All Auctions</Link></li>
              <li><Link to="/categories" className="transition-colors hover:text-accent-400">Browse Categories</Link></li>
              <li><Link to="/auctions?sort=ending_soon" className="transition-colors hover:text-accent-400">Ending Soon</Link></li>
              <li><Link to="/register" className="transition-colors hover:text-accent-400">Start Selling</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-surface-100">Company</h4>
            <ul className="space-y-4 text-sm text-surface-400">
              <li><a href="#" className="transition-colors hover:text-accent-400">About Us</a></li>
              <li><a href="#" className="transition-colors hover:text-accent-400">How it Works</a></li>
              <li><a href="#" className="transition-colors hover:text-accent-400">Trust & Safety</a></li>
              <li><a href="#" className="transition-colors hover:text-accent-400">Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider text-surface-100">Stay Updated</h4>
            <p className="mb-4 text-sm text-surface-400">Subscribe to our newsletter for the latest exclusive auctions and updates.</p>
            <form className="flex flex-col gap-3 sm:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full rounded-xl border border-surface-700 bg-surface-900 px-4 py-2.5 text-sm text-surface-100 outline-none focus:border-accent-500/50"
              />
              <button 
                type="button" 
                className="whitespace-nowrap rounded-xl bg-surface-800 px-5 py-2.5 text-sm font-semibold text-surface-100 transition-colors hover:bg-surface-700"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-surface-800 pt-8 sm:flex-row">
          <p className="mb-4 text-sm text-surface-500 sm:mb-0">
            &copy; {new Date().getFullYear()} BidVerse. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-surface-500">
            <a href="#" className="hover:text-surface-300">Privacy Policy</a>
            <a href="#" className="hover:text-surface-300">Terms of Service</a>
            <a href="#" className="hover:text-surface-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
