import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Gavel,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-surface-950">

        {/* Background Glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[300px]
            w-[300px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-accent-500/10
            blur-3xl
            sm:h-[500px]
            sm:w-[500px]
            lg:h-[700px]
            lg:w-[700px]
          "
        />

        <div
          className="
            container-app
            relative
            py-20
            text-center
            sm:py-24
            lg:py-28
          "
        >

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              mx-auto
              max-w-4xl
              font-display
              text-4xl
              font-bold
              leading-tight
              text-surface-50
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            Discover, Bid, and{" "}
            <span className="gradient-text">
              Win.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-surface-400
              sm:text-lg
            "
          >
            BidVerse is a modern online auction marketplace
            for rare collectibles, electronics, vehicles,
            and exclusive items.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            className="
              mx-auto
              mt-8
              flex
              max-w-md
              flex-col
              gap-3
              sm:max-w-none
              sm:flex-row
              sm:justify-center
            "
          >

            <Link
              to="/auctions"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-accent-500
                px-6
                py-3
                text-sm
                font-semibold
                text-surface-950
                transition-all
                hover:-translate-y-0.5
                hover:bg-accent-400
              "
            >
              Explore Auctions
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/register"
              className="
                flex
                items-center
                justify-center
                rounded-lg
                border
                border-surface-700
                bg-surface-900
                px-6
                py-3
                text-sm
                font-semibold
                text-surface-100
                transition-all
                hover:-translate-y-0.5
                hover:bg-surface-800
              "
            >
              Start Selling
            </Link>

          </motion.div>

        </div>
      </section>


      {/* How It Works */}
      <section className="border-t border-surface-800 bg-surface-900">

        <div className="container-app py-16 sm:py-20">

          <div className="mx-auto max-w-2xl text-center">

            <h2
              className="
                font-display
                text-3xl
                font-bold
                text-surface-50
                sm:text-4xl
              "
            >
              How BidVerse Works
            </h2>

            <p className="mt-3 text-sm text-surface-400 sm:text-base">
              Start buying and selling in three simple steps.
            </p>

          </div>


          {/* Steps */}
          <div
            className="
              mt-10
              grid
              gap-5
              sm:mt-12
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            <StepCard
              icon={<ShieldCheck size={28} />}
              step="01"
              title="Register Securely"
              description="Create your account and join a safe and trusted auction marketplace."
            />

            <StepCard
              icon={<Gavel size={28} />}
              step="02"
              title="Place Your Bids"
              description="Discover products you love and compete with other bidders."
            />

            <StepCard
              icon={<Zap size={28} />}
              step="03"
              title="Win & Pay"
              description="Become the highest bidder and securely complete your payment."
            />

          </div>

        </div>
      </section>


      {/* Live Auctions */}
      <section className="bg-surface-950">

        <div
          className="
            container-app
            py-16
            text-center
            sm:py-20
          "
        >

          <h2
            className="
              font-display
              text-3xl
              font-bold
              text-surface-50
              sm:text-4xl
            "
          >
            Live Auctions
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-lg
              text-sm
              leading-6
              text-surface-400
              sm:text-base
            "
          >
            Discover products currently available for bidding
            and find your next great deal.
          </p>

          <Link
            to="/auctions"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-accent-400
              transition-colors
              hover:text-accent-300
            "
          >
            View all live auctions
            <ArrowRight size={16} />
          </Link>

        </div>
      </section>

      <section>
        <Footer />
      </section>

    </main>
  );
}


/* Step Card */
function StepCard({
  icon,
  step,
  title,
  description,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="
        glass-card
        p-6
        text-center
        sm:p-7
      "
    >

      {/* Icon */}
      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-xl
          bg-accent-500/10
          text-accent-400
        "
      >
        {icon}
      </div>

      {/* Step */}
      <span
        className="
          mt-5
          block
          text-xs
          font-semibold
          tracking-widest
          text-accent-400
        "
      >
        STEP {step}
      </span>

      {/* Title */}
      <h3
        className="
          mt-2
          text-lg
          font-semibold
          text-surface-100
        "
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className="
          mx-auto
          mt-3
          max-w-sm
          text-sm
          leading-6
          text-surface-400
        "
      >
        {description}
      </p>

    </motion.div>
  );
}