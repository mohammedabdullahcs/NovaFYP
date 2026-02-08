import LottieWrapper from "@/components/common/LottieWrapper";
import emptyAnimation from "@/public/animations/empty.json";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No results yet",
  description = "Try refining your search or adjust the filters."
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <LottieWrapper animationData={emptyAnimation} className="w-32 h-32" />
      <div>
        <p className="text-text-100 font-semibold">{title}</p>
        <p className="text-text-200 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
}
