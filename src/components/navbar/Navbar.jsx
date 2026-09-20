import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Gavel, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-surface-800 bg-surface-950/95 backdrop-blur-md">
      <nav className="container-app">

        {/* ================= DESKTOP / HEADER ================= */}
        <div className="flex h-16 items-center justify-between sm:h-20">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2 sm:gap-3"
            onClick={closeMenu}
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-accent-500
                text-surface-950
                sm:h-10
                sm:w-10
              "
            >
              <Gavel size={19} />
            </div>

            <span
              className="
                font-display
                text-xl
                font-bold
                text-surface-50
                sm:text-2xl
              "
            >
              BidVerse
            </span>
          </Link>


          {/* ================= DESKTOP NAVIGATION ================= */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">

            {/* Home */}
            <NavLink to="/" label="Home" />

            {/* Auctions */}
            <NavLink to="/auctions" label="Auctions" />

            {/* Categories */}
            <NavLink to="/categories" label="Categories" />

            {/* Authenticated Links */}
            {user && (
              <>
                <NavLink
                  to="/my-bids"
                  label="My Bids"
                />

                <NavLink
                  to="/my-auctions"
                  label="My Auctions"
                />
              </>
            )}

          </div>


          {/* ================= DESKTOP AUTH ================= */}
          <div className="hidden items-center gap-3 md:flex">

            {user ? (
              <>
                <span className="hidden whitespace-nowrap text-sm text-surface-300 lg:block">
                  Hi,{" "}
                  <span className="font-medium text-accent-400">
                    {user.name.split(" ")[0]}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    whitespace-nowrap
                    rounded-lg
                    border
                    border-surface-700
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-surface-300
                    transition-colors
                    hover:bg-surface-800
                    hover:text-surface-50
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="
                    whitespace-nowrap
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-surface-300
                    transition-colors
                    hover:text-surface-50
                  "
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="
                    whitespace-nowrap
                    rounded-lg
                    bg-accent-500
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-surface-950
                    transition-colors
                    hover:bg-accent-400
                  "
                >
                  Register
                </Link>
              </>
            )}

          </div>


          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              rounded-lg
              p-2
              text-surface-300
              transition-colors
              hover:bg-surface-800
              hover:text-surface-50
              md:hidden
            "
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

        </div>


        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-surface-800 md:hidden"
            >

              <div className="flex flex-col gap-1 py-4">

                {/* Home */}
                <MobileLink
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </MobileLink>


                {/* Auctions */}
                <MobileLink
                  to="/auctions"
                  onClick={closeMenu}
                >
                  Auctions
                </MobileLink>


                {/* Categories */}
                <MobileLink
                  to="/categories"
                  onClick={closeMenu}
                >
                  Categories
                </MobileLink>


                {/* Authenticated User */}
                {user && (
                  <>
                    <MobileLink
                      to="/my-bids"
                      onClick={closeMenu}
                    >
                      My Bids
                    </MobileLink>

                    <MobileLink
                      to="/my-auctions"
                      onClick={closeMenu}
                    >
                      My Auctions
                    </MobileLink>

                    <div className="my-3 border-t border-surface-800" />

                    <div className="px-3 py-2 text-sm text-surface-400">
                      Signed in as{" "}
                      <span className="font-medium text-accent-400">
                        {user.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        rounded-lg
                        px-3
                        py-3
                        text-left
                        text-sm
                        font-medium
                        text-surface-300
                        transition-colors
                        hover:bg-surface-800
                        hover:text-surface-50
                      "
                    >
                      Logout
                    </button>
                  </>
                )}


                {/* Guest User */}
                {!user && (
                  <>
                    <div className="my-3 border-t border-surface-800" />

                    <MobileLink
                      to="/login"
                      onClick={closeMenu}
                    >
                      Sign In
                    </MobileLink>

                    <MobileLink
                      to="/register"
                      onClick={closeMenu}
                      accent
                    >
                      Register
                    </MobileLink>
                  </>
                )}

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </header>
  );
}


/* =========================================================
   Desktop Navigation Link
   ========================================================= */

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="
        whitespace-nowrap
        text-sm
        font-medium
        text-surface-300
        transition-colors
        hover:text-accent-400
      "
    >
      {label}
    </Link>
  );
}


/* =========================================================
   Mobile Navigation Link
   ========================================================= */

function MobileLink({
  to,
  children,
  onClick,
  accent = false,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        rounded-lg
        px-3
        py-3
        text-sm
        font-medium
        transition-colors
        hover:bg-surface-800
        ${
          accent
            ? "text-accent-400"
            : "text-surface-300 hover:text-surface-50"
        }
      `}
    >
      {children}
    </Link>
  );
}