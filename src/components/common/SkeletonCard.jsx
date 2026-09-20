/**
 * Skeleton loader card mimicking AuctionCard shape.
 */
export default function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden">
      {/* Image placeholder */}
      <div className="skeleton h-48 w-full rounded-none" />

      {/* Content */}
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />

        <div className="flex items-center justify-between pt-2">
          <div className="skeleton h-5 w-24" />
          <div className="skeleton h-4 w-16" />
        </div>

        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-8 w-full rounded-lg" />
      </div>
    </div>
  );
}
