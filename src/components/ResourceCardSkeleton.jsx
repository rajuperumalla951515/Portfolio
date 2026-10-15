export const ResourceCardSkeleton = () => {
  return (
    <div
      className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/80 space-y-3.5 animate-pulse shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between"
      aria-hidden="true"
    >
      <div className="space-y-3.5">
        {/* Header thumbnail and category */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-100 rounded-xl shrink-0" />
            <div className="space-y-1.5">
              <div className="h-3 w-16 bg-zinc-100 rounded" />
              <div className="h-3.5 w-28 bg-zinc-100 rounded" />
            </div>
          </div>
          <div className="h-4 w-14 bg-zinc-100 rounded-full" />
        </div>

        {/* Title */}
        <div className="space-y-1.5 pt-1">
          <div className="h-4 w-5/6 bg-zinc-100 rounded" />
          <div className="h-4 w-3/5 bg-zinc-100 rounded" />
        </div>

        {/* Location */}
        <div className="h-3 w-32 bg-zinc-100 rounded" />

        {/* Summary: 2 lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3 w-full bg-zinc-50 rounded" />
          <div className="h-3 w-4/5 bg-zinc-50 rounded" />
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 pt-1">
          <div className="h-4 w-12 bg-zinc-100 rounded-md" />
          <div className="h-4 w-14 bg-zinc-100 rounded-md" />
          <div className="h-4 w-10 bg-zinc-100 rounded-md" />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3.5 mt-4 border-t border-zinc-100 flex items-center justify-between">
        <div className="h-3 w-20 bg-zinc-100 rounded" />
        <div className="h-3.5 w-24 bg-zinc-100 rounded" />
      </div>
    </div>
  );
};

export default ResourceCardSkeleton;
